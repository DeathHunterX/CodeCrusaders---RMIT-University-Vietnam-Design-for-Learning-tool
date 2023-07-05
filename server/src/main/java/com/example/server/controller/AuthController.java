package com.example.server.controller;

import com.example.server.api.request.SignupRequest;
import com.example.server.api.response.MessageResponse;
import com.example.server.model.User;
import com.example.server.repository.UserRepository;
import com.example.server.security.jwt.JwtResponse;
import com.example.server.model.LoginRequest;
import com.example.server.security.jwt.JwtUtils;
import com.example.server.security.service.CustomUserDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("v1/api/auth")
@RequiredArgsConstructor
public class AuthController {
  private final AuthenticationManager authenticationManager;
  private final UserRepository userRepository;
  private final JwtUtils jwtUtils;
  private final PasswordEncoder passwordEncoder;

  @PostMapping("/sign-in")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.createToken(authentication);
    System.out.println(jwt);

    CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
    System.out.println(userDetails.getUsername());

    return ResponseEntity.ok(new JwtResponse(jwt,
        userDetails.getUser().getId(),
        userDetails.getUsername(),
        userDetails.getUser().getName()));
  }

  @PostMapping("/sign-up")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
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
