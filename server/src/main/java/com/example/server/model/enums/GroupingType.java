package com.example.server.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum GroupingType {
    INDIVIDUAL("Individual"),
    CLASS("Class");

    private final String displayName;
    GroupingType(String displayName) {
        this.displayName = displayName;
    }
    @JsonValue
    public String getDisplayName() {
        return displayName;
    }
}
