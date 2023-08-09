package com.example.server.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum SessionName {
  PRE_CLASS("Pre_class"),
  IN_CLASS("In_class"),
  POST_CLASS("Post_class");

  private final String displayName;

  SessionName(String displayName) {
    this.displayName = displayName;
  }
  @JsonValue
  public String getDisplayName() {
    return displayName;
  }

}
