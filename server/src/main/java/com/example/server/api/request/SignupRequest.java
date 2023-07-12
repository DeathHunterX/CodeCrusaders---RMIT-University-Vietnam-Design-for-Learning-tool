package com.example.server.api.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {
  @Valid
  @NotBlank(message="Username should not be empty")
  private String username;

  @NotBlank(message="First name should not be empty")
  private String firstName;

  @NotBlank(message="Last name should not be empty")
  private String lastName;

  @NotBlank
  @Size(min = 8, message = "password should have at least 8 characters")
  private String password;



}
