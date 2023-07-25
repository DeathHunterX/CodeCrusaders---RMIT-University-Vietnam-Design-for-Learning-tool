package com.example.server.api.request;

import com.example.server.model.enums.GroupingType;
import com.example.server.model.enums.InteractionType;
import com.example.server.model.enums.SessionOption;
import com.example.server.model.enums.SessionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SessionUpdateRequest {
    private SessionType sessionType;
    private GroupingType groupingType;
    private SessionOption sessionOption;

    private InteractionType interactionType;
    private Boolean hasLecturer;
}
