package com.example.server.exception;

import com.example.server.api.response.ErrorExceptionResponse;
import org.modelmapper.spi.ErrorMessage;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ApplicationExceptionHandler {
  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException exception) {
    Map<String, String> errors = new HashMap<>();
    exception.getBindingResult().getAllErrors().forEach((err) -> {
      var fieldName = ((FieldError) err).getField();
      var errorMessage = err.getDefaultMessage();
      errors.put(fieldName, errorMessage);
    });
    return errors;
  }

  @ExceptionHandler(NoHandlerFoundException.class)
  public ResponseEntity<String> handleNoHandlerFoundException(NoHandlerFoundException ex) {
    var responseBody = "{\"status\": 404, \"error\": \"Resource not found\"}";
    return new ResponseEntity<>(responseBody, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(ObjectNotFoundException.class)
  public ResponseEntity<ErrorExceptionResponse> handleObjectNotFoundException(ObjectNotFoundException ex) {
    var errorResponse = ErrorExceptionResponse.builder()
        .error(String.format("%s not found with this %s", ex.getResourceName(), ex.getFieldName())).build();
    return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(value = TokenRefreshException.class)
  @ResponseStatus(HttpStatus.FORBIDDEN)
  public ResponseEntity<ErrorExceptionResponse> handleTokenRefreshException(TokenRefreshException ex) {
    var errorResponse = ErrorExceptionResponse.builder()
        .error(ex.getMessage()).build();
    return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
  }
}
