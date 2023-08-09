package com.example.server.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
  private String token;
  private String type = "Bearer";
  private UUID id;
  private String name;
  private String username;
  private String refreshToken;


  public JwtResponse(String accessToken, UUID id, String username, String name, String refreshToken) {
    this.token = accessToken;
    this.id = id;
    this.username = username;
    this.name = name;
    this.refreshToken = refreshToken;
  }

}
