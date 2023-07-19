package com.example.server.service.impl;

import com.example.server.exception.InvalidUsernameException;
import com.example.server.model.CustomUserDetails;
import com.example.server.model.User;
import com.example.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService {
  private final UserRepository userRepository;
  @Override
  public CustomUserDetails loadUserByUsername(String username) throws InvalidUsernameException {
    User user = userRepository.findByUsername(username);
    if (user == null) {
      throw new InvalidUsernameException("Invalid user credentials");
    }
    return new CustomUserDetails(user);
  }

  public Optional<User> getUserById(UUID id) {
    return userRepository.findById(id);
  }


}
