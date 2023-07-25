package com.example.server.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum SessionOption {
  F2F("F2F"),
  ONLINE("Online"),
  HYBRID("Hybrid");

  private final String displayName;

  SessionOption(String displayName) {
    this.displayName = displayName;
  }
  @JsonValue
  public String getDisplayName() {
    return displayName;
  }
}
