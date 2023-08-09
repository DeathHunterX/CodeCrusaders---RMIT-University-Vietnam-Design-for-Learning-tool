package com.example.server.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ActivityID {
    WARM_UP("warm_up"),
    READ_WATCH_LISTEN("read_watch_listen"),
    REFLECT("reflect"),
    ASSESS("assess"),
    COLLABORATE("collaborate"),
    DISCUSS("discuss"),
    BREAK("break");

    private final String displayName;

    ActivityID(String displayName) {
        this.displayName = displayName;
    }

    @JsonValue
    public String getDisplayName() {
        return displayName;
    }
}
