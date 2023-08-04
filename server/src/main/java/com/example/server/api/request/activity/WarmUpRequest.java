package com.example.server.api.request.activity;

import com.example.server.model.enums.ActivityType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WarmUpRequest {
    private ActivityType activityType = ActivityType.WARM_UP;
    private Integer duration;
    private String warmUpOption;
    private String engagementOption;
}
