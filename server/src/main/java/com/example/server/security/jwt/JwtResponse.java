package com.example.server.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
  private String token;
  private String type = "Bearer";
  private Long id;
  private String name;
  private String username;


  public JwtResponse(String accessToken, Long id, String username, String name) {
    this.token = accessToken;
    this.id = id;
    this.username = username;
    this.name = name;
  }

}
