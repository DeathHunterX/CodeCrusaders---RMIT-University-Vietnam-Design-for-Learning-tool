package com.example.server.api.request.activity;

import com.example.server.model.enums.ActivityType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssessRequest {
    private ActivityType activityType = ActivityType.ASSESS;
    private Integer duration;
    private String accessType;

}
