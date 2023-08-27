package com.example.server.service;

import com.example.server.api.request.ActivityListRequest;
import com.example.server.api.request.ActivityRequest;
import com.example.server.api.response.ApiResponse;
import com.example.server.model.Activity;
import com.example.server.model.Course;
import com.example.server.model.Session;
import com.example.server.model.activities.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ActivityService {
    List<Activity> getAllActivities();

    Activity getActivityById(UUID id);

    Activity createActivity(ActivityRequest activityRequest, Course course, Session session);

    Activity updateActivity(UUID activityId, ActivityRequest activityRequest);

    ApiResponse dragAndDropActivities(UUID courseId, UUID moduleId, ActivityListRequest activityListRequest);


    ResponseEntity<?> deleteActivity(UUID courseId, UUID sessionId, UUID activityId);
}

