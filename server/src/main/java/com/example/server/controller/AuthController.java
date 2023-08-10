package com.example.server.controller;

import com.example.server.api.request.SignupRequest;
import com.example.server.api.response.ApiResponse;
import com.example.server.api.response.MessageResponse;
import com.example.server.api.response.UserResponse;
import com.example.server.exception.TokenRefreshException;
import com.example.server.model.RefreshToken;
import com.example.server.model.User;
import com.example.server.repository.UserRepository;
import com.example.server.api.request.LoginRequest;
import com.example.server.security.jwt.JwtResponse;
import com.example.server.security.jwt.JwtUtils;
import com.example.server.model.CustomUserDetails;
import com.example.server.security.jwt.RefreshTokenRequest;
import com.example.server.security.jwt.RefreshTokenResponse;
import com.example.server.service.RefreshTokenService;
import com.example.server.service.impl.UserDetailsServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("v1/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
  private final AuthenticationManager authenticationManager;
  private final UserRepository userRepository;
  private final JwtUtils jwtUtils;
  private final BCryptPasswordEncoder passwordEncoder;
  private final RefreshTokenService refreshTokenService;
  private final ModelMapper modelMapper;

  @PostMapping("/sign-in")
  public ResponseEntity<?> authenticateUser(@RequestBody @Valid LoginRequest loginRequest) throws Exception {
    try {
      log.info("Start authenticate...");
      Authentication authentication = authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
      SecurityContextHolder.getContext().setAuthentication(authentication);
      String jwt = jwtUtils.createToken(authentication);
      CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
      RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getUser().getId());
      return ResponseEntity.ok(new JwtResponse(jwt,
              userDetails.getUser().getId(),
              userDetails.getUsername(),
              userDetails.getUser().getName(),refreshToken.getToken()));
    }catch (BadCredentialsException e) {
      return new ResponseEntity<>(new ApiResponse("Invalid username or password!"),HttpStatus.UNAUTHORIZED);
    }
  }

  @PostMapping("/refresh-token")
  public ResponseEntity<?> getNewTokenFromRefreshToken(@Valid @RequestBody RefreshTokenRequest request) {
    String requestRefreshToken = request.getRefreshToken();
    return refreshTokenService.findByToken(requestRefreshToken)
        .map(refreshTokenService::verifyExpirationDate)
        .map(RefreshToken::getUser)
        .map(user -> {
          Authentication authentication = authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
          String token = jwtUtils.createToken(authentication);
          return ResponseEntity.ok(new RefreshTokenResponse(token, requestRefreshToken));
        })
        .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,
            "Refresh token is not found"));
  }

  @PostMapping("/sign-up")
  public ResponseEntity<?> registerUser(@RequestBody @Valid SignupRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Username is already taken!"));
    }
    // Create new user's account
    User user = new User();
    user.setUsername(signUpRequest.getUsername());
    user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
    user.setName(signUpRequest.getFirstName() + " "+(signUpRequest.getLastName()));
    userRepository.save(user);
    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }

  @GetMapping("/current-user")
  public ResponseEntity<UserResponse> getCurrentUser() {
    SecurityContext securityContext = SecurityContextHolder.getContext();
    Authentication authentication = securityContext.getAuthentication();
    System.out.println(authentication);
    if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof CustomUserDetails) {
      CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
      return ResponseEntity.ok(modelMapper.map(userDetails.getUser(), UserResponse.class));
    }
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
  }


  @PostMapping("/logout")
  public ResponseEntity<?> logout(HttpServletRequest request) {
    SecurityContextHolder.clearContext();
    HttpSession session = request.getSession(false);
    if (session != null) {
      session.invalidate();
    }

    return new ResponseEntity<>(new ApiResponse("You have been successfully logged out."),HttpStatus.OK);
  }
}
