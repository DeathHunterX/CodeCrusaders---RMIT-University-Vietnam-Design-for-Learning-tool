package com.example.server.service.impl;

import com.example.server.model.Activity;
import com.example.server.model.activities.WarmUp;
import com.example.server.model.enums.ActivityType;
import com.example.server.repository.ActivityRepository;
import com.example.server.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements ActivityService {
  private final ActivityRepository activityRepository;
  @Override
  public List<Activity> getAllActivities() {
    return activityRepository.findAll();
  }

  @Override
  public Optional<Activity> getActivityById(UUID id) {
    return activityRepository.findById(id);
  }

  @Override
  public Activity createActivity(String activityType) {
//    switch (activityType) {
//      case "activity-01":
//        return activityRepository.save(
//    }

    return null;
  }

//  @Override
//  public Activity createActivity(Activity activity, String zzz) {
//    return activityRepository.save(activity);
//  }

  @Override
  public void deleteActivity(UUID id) {
    activityRepository.deleteById(id);

  }

  @Override
  public ResponseEntity<Activity> updateActivity(Activity activityInfo, UUID id) {
    Optional<Activity> activityData = activityRepository.findById(id);
    if (activityData.isPresent()) {
      Activity _activity = activityData.get();
      _activity.setDuration(activityInfo.getDuration());
      _activity.setSession(activityInfo.getSession());
      return new ResponseEntity<>(activityRepository.save(_activity), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}
