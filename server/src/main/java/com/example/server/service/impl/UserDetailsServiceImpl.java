package com.example.server.security.service;

import com.example.server.api.request.LoginRequest;
import com.example.server.exception.InvalidUserCredentialsException;
import com.example.server.model.User;
import com.example.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService {
  private final UserRepository userRepository;
  @Override
  public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username);
//    if (user == null) {
//      log.debug("Invalid username or password!");
//      throw new UsernameNotFoundException("Invalid username or password!");
//    }
    return new CustomUserDetails(user);
  }
}
