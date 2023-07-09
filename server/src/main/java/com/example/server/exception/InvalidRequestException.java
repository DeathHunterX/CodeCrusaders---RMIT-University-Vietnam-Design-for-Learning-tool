package com.example.server.exception;

import org.springframework.security.authentication.BadCredentialsException;

public class InvalidRequestException extends BadCredentialsException {
  public InvalidRequestException(String message) {
    super(message);
  }
  public InvalidRequestException(String message, Throwable err) {
    super(message, err);
  }
}
