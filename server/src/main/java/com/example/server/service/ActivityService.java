package com.example.server.service;

import com.example.server.model.Activity;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface ActivityService {
  List<Activity> getAllActivities();
  Optional<Activity> getActivityById(Long id);

  Activity createActivity(Activity activity);
  void deleteActivity(Long id);

  ResponseEntity<Activity> updateActivity(Activity activityInfo, Long id);
}

