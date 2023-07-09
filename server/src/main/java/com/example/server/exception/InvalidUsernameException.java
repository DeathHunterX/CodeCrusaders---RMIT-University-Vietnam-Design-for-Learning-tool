package com.example.server.exception;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class InvalidUsernameException extends UsernameNotFoundException {
  public InvalidUsernameException(String message) {
    super(message);
  }
  public InvalidUsernameException(String message, Throwable err) {
    super(message, err);
  }
}
