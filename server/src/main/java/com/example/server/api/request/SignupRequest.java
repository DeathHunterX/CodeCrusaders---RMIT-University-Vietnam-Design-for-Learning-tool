package com.example.server.api.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {
  @NotBlank(message="Username may not be empty")
  private String username;

  @NotBlank(message="First name may not be empty")
  private String firstName;

  @NotBlank(message="Last name may not be empty")
  private String lastName;

  @NotBlank
  @Size(min = 8, message = "password should have at least 8 characters")
  private String password;



}
