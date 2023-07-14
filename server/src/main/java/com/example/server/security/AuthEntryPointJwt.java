package com.example.server.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
public class AuthEntryPointJwt implements AuthenticationEntryPoint {
  @Override
  public void commence(HttpServletRequest httpServletRequest,
                       HttpServletResponse httpServletResponse,
                       AuthenticationException exception) throws IOException {
    if (log.isDebugEnabled()) {
      log.info(exception.getMessage());
      log.info(exception.toString());
      log.info(httpServletRequest.getHeader("Authorization"));
    }
    log.info("Get rest authentication exception");
    httpServletResponse.setContentType(MediaType.APPLICATION_JSON_VALUE);
    httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    String responseBody = "{\"status\": 401, \"error\": \"Unauthorized\"}";
    httpServletResponse.getWriter().write(responseBody);
  }
}