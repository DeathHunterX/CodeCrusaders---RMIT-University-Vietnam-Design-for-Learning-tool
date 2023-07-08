package com.example.server.exception;

public class InvalidRequestException extends Exception{
  public InvalidRequestException(String message) {
    super(message);
  }
  public InvalidRequestException(String message, Throwable err) {
    super(message, err);
  }
}
