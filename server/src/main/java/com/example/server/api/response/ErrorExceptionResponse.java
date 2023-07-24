package com.example.server.api.response;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ErrorExceptionResponse {
    private String error;
}
