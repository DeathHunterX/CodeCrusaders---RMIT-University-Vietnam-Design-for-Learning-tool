package com.example.server.security.jwt;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RefreshTokenRequest {
  @NotBlank
  private String refreshToken;

}
