package com.example.server.security;

import com.example.server.exception.InvalidRequestException;
import com.example.server.exception.InvalidUserCredentialsException;
import com.example.server.service.impl.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DefaultAuthenticationProvider implements AuthenticationProvider {
  private final BCryptPasswordEncoder passwordEncoder;
  private final UserDetailsServiceImpl userDetailsService;
  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    final String username = authentication.getName();
    final String password = authentication.getCredentials().toString();
    UserDetails userDetails = null;
    try {
      userDetails = authenticateUser(username,password);
    } catch (InvalidRequestException e) {
      log.debug(String.valueOf(e));
    } catch (InvalidUserCredentialsException e) {
      log.debug(String.valueOf(e));
    }
    return new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities() );
  }

  public UserDetails authenticateUser(String username, String password) throws InvalidRequestException, InvalidUserCredentialsException {
    if(username == null || password == null) {
      throw new InvalidRequestException("Invalid request!");
    }
    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
    if(userDetails == null) {
      throw new InvalidUserCredentialsException("Invalid user credential!");
    }
    if(!passwordEncoder.matches(password,userDetails.getPassword())) {
      throw new InvalidUserCredentialsException("Invalid user credential!");
    }
    return userDetails;
  }

  @Override
  public boolean supports(Class<?> authentication) {
    return authentication.equals(UsernamePasswordAuthenticationFilter.class);
  }
}
