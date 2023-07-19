package com.example.server.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ApplicationExceptionHandler {
  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException exception) {
    Map<String, String> errors = new HashMap<>();
    exception.getBindingResult().getAllErrors().forEach((err)->{
      String fieldName = ((FieldError) err).getField();
      String errorMessage = err.getDefaultMessage();
      errors.put(fieldName,errorMessage);
    });
    return errors;
  }
  @ExceptionHandler(NoHandlerFoundException.class)
  public ResponseEntity<String> handleNoHandlerFoundException(NoHandlerFoundException ex) {
    String responseBody = "{\"status\": 404, \"error\": \"Resource not found\"}";
    return new ResponseEntity<>(responseBody, HttpStatus.NOT_FOUND);
  }

}
