package com.example.server.api.response;

import com.example.server.model.enums.GroupingType;
import com.example.server.model.enums.SessionOption;
import com.example.server.model.enums.SessionName;

public class SessionResponse {
    private SessionName sessionName;

    private GroupingType groupingType;

    private SessionOption sessionOption;

    private Boolean hasLecturer;

}
