package com.example.server.api.response;

import com.example.server.model.enums.GroupingType;
import com.example.server.model.enums.SessionOption;
import com.example.server.model.enums.SessionType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public class SessionResponse {
    private SessionType sessionType;

    private GroupingType groupingType;

    private SessionOption sessionOption;

    private Boolean hasLecturer;

}
