package com.example.server.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ActivityType {
    WARM_UP("Warm Up"),
    READ_WATCH_LISTEN("Read, Watch, Listen"),
    REFLECT("Reflect"),
    ASSESS("Assess"),
    COLLABORATE("Collaborate"),
    DISCUSS("Discuss"),
    BREAK("Break");

    private final String displayName;

    ActivityType(String displayName) {
        this.displayName = displayName;
    }

    @JsonValue
    public String getDisplayName() {
        return displayName;
    }
}
