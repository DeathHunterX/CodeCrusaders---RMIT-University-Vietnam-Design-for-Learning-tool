package com.example.server.api.request.activity;

import com.example.server.model.enums.ActivityType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReflectRequest{
    private ActivityType activityType = ActivityType.REFLECT;
    private Integer duration;
    private String reflectionType;

}
