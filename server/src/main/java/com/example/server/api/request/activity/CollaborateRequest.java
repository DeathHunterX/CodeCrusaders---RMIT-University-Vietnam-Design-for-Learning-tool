package com.example.server.api.request.activity;

import com.example.server.model.enums.ActivityType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CollaborateRequest {
    private ActivityType activityType = ActivityType.COLLABORATE;
    private Integer duration;
    private String collaborateType;

}
