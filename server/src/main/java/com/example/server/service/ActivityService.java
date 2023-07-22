package com.example.server.service;

import com.example.server.model.Activity;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ActivityService {
  List<Activity> getAllActivities();
  Optional<Activity> getActivityById(UUID id);

  Activity createActivity(String activityType);
  void deleteActivity(UUID id);

  ResponseEntity<Activity> updateActivity(Activity activityInfo, UUID id);
}

