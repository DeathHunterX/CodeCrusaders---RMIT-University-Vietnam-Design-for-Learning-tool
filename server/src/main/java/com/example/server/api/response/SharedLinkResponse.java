package com.example.server.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Builder
public class SharedLinkResponse {
  private UUID courseId;
  private UUID moduleId;
  private UUID userId;
}
