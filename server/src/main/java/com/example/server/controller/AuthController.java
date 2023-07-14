package com.example.server.controller;

import com.example.server.api.request.SignupRequest;
import com.example.server.api.response.MessageResponse;
import com.example.server.model.User;
import com.example.server.repository.UserRepository;
import com.example.server.api.request.LoginRequest;
import com.example.server.security.jwt.JwtResponse;
import com.example.server.security.jwt.JwtUtils;
import com.example.server.model.CustomUserDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("v1/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
  private final AuthenticationManager authenticationManager;
  private final UserRepository userRepository;
  private final JwtUtils jwtUtils;
  private final BCryptPasswordEncoder passwordEncoder;

  @PostMapping("/sign-in")
  public ResponseEntity<?> authenticateUser(@RequestBody @Valid LoginRequest loginRequest) throws Exception {
    try {
      log.info("Start authenticate...");
      Authentication authentication = authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
      SecurityContextHolder.getContext().setAuthentication(authentication);
      String jwt = jwtUtils.createToken(authentication);
      CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
      return ResponseEntity.ok(new JwtResponse(jwt,
              userDetails.getUser().getId(),
              userDetails.getUsername(),
              userDetails.getUser().getName()));
    }catch (BadCredentialsException e) {
      return new ResponseEntity<>("Invalid username or password!",HttpStatus.UNAUTHORIZED);
    }
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
}
