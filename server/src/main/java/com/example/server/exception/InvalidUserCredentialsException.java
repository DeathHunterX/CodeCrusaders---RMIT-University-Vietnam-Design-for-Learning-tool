package com.example.server.exception;

public class InvalidUserCredentialsException extends Exception{
  public InvalidUserCredentialsException(String message) {
    super(message);
  }
  public InvalidUserCredentialsException(String message, Throwable err) {
    super(message, err);
  }
}
