package com.example.server.service.impl;

import com.example.server.model.Activity;
import com.example.server.model.activities.*;
import com.example.server.model.enums.ActivityType;
import com.example.server.repository.ActivityRepository;
import com.example.server.service.ActivityService;
import lombok.RequiredArgsConstructor;
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
        switch (activityType) {
            case "activity-01":
                WarmUp warmUp = new WarmUp();
                warmUp.setActivityType(ActivityType.WARM_UP);
                return activityRepository.save(warmUp);
            case "activity-02":
                ReadWatchListen readWatchListen = new ReadWatchListen();
                readWatchListen.setActivityType(ActivityType.READ_WATCH_LISTEN);
                return activityRepository.save(readWatchListen);
            case "activity-03":
                Reflect reflect = new Reflect();
                reflect.setActivityType(ActivityType.REFLECT);
                return activityRepository.save(reflect);
            case "activity-04":
                Discuss discuss = new Discuss();
                discuss.setActivityType(ActivityType.DISCUSS);
                return activityRepository.save(discuss);
            case "activity-05":
                Collaborate collaborate = new Collaborate();
                collaborate.setActivityType(ActivityType.COLLABORATE);
                return activityRepository.save(collaborate);
            case "activity-06":
                Assess assess = new Assess();
                assess.setActivityType(ActivityType.ASSESS);
                return activityRepository.save(assess);
            case "activity-07":
                Break breakAct = new Break();
                breakAct.setActivityType(ActivityType.BREAK);
                return activityRepository.save(breakAct);
            default:
                break;
        }
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
