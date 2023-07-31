package com.example.server.api.request.activity;

import com.example.server.model.enums.ActivityType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReadWatchListenRequest {
    private ActivityType activityType = ActivityType.READ_WATCH_LISTEN;
    private Integer duration;
}
