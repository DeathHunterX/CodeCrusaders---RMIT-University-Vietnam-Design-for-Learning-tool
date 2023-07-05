//package com.example.server.security;
//
//
//import com.example.server.api.request.SignupRequest;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import jakarta.validation.ConstraintViolation;
//import jakarta.validation.Validation;
//import jakarta.validation.Validator;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//import java.util.Set;
//
//
//@Component
//public class ValidationFilter extends OncePerRequestFilter {
//  private final Validator validator;
//
//  public ValidationFilter() {
//    this.validator = Validation.buildDefaultValidatorFactory().getValidator();
//  }
//
//  @Override
//  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//    // Extract the SignupRequest object from the request
//    SignupRequest signupRequest = extractSignupRequest(request);
//
//    if (signupRequest == null) {
//      // Handle the case when the SignupRequest object is not present
//      response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//      response.getWriter().write("SignupRequest object is required");
//      return;
//    }
//
//    // Validate the SignupRequest object
//    Set<ConstraintViolation<SignupRequest>> violations = validator.validate(signupRequest);
//
//    if (!violations.isEmpty()) {
//      // Handle validation errors
//      handleValidationErrors(violations, response);
//      return;
//    }
//
//    // Continue the filter chain
//    filterChain.doFilter(request, response);
//  }
//
//  private SignupRequest extractSignupRequest(HttpServletRequest request) throws IOException {
//    // Implement the logic to extract the SignupRequest object from the request
//    // For example, you can use JSON deserialization or other methods based on your application's requirements
//    // Here, we assume the SignupRequest object is present as a request attribute with the key "signupRequest"
//    ObjectMapper objectMapper = new ObjectMapper();
//    return objectMapper.readValue(request.getInputStream(), Lo.class);
//  }
//
//  private void handleValidationErrors(Set<ConstraintViolation<SignupRequest>> violations, HttpServletResponse response) throws IOException {
//    // Create a StringBuilder to hold the error messages
//    StringBuilder errorMessage = new StringBuilder();
//
//    // Iterate over the violations and append each error message
//    for (ConstraintViolation<SignupRequest> violation : violations) {
//      if (errorMessage.length() > 0) {
//        errorMessage.append(", ");
//      }
//      errorMessage.append(violation.getMessage());
//    }
//
//    // Set the response status code to 400 (Bad Request) and write the error message as the response body
//    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//    response.getWriter().write(errorMessage.toString());
//  }
//}