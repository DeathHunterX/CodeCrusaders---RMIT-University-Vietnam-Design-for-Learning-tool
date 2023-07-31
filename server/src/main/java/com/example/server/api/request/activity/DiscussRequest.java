package com.example.server.api.request.activity;

import com.example.server.model.enums.ActivityType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DiscussRequest {
    private ActivityType activityType = ActivityType.DISCUSS;
    private Integer duration;
    private String groupType;
}
