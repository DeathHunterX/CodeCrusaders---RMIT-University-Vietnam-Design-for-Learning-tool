package com.example.server.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum InteractionType {
    SYNCHRONOUS("Synchronous"),
    ASYNCHRONOUS("Asynchronous");
    private final String displayName;

    InteractionType(String displayName) {
        this.displayName = displayName;
    }
    @JsonValue
    public String getDisplayName() {
        return displayName;
    }
}
