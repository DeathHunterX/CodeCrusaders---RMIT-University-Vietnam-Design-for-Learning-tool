package com.example.server.service;

import com.example.server.api.request.activity.*;
import com.example.server.model.Activity;
import com.example.server.model.Course;
import com.example.server.model.activities.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ActivityService {
    List<Activity> getAllActivities();

    Activity getActivityById(UUID id);

    Activity createActivity(String activityType, Course course);

    ResponseEntity<?> moveActivityToSession(UUID courseId, UUID sessionId, UUID activityId);

    ResponseEntity<?> removeActivityToSession(UUID courseId, UUID sessionId, UUID activityId);

    ResponseEntity<?> moveActivityBetweenSessions(UUID sessionId, UUID targetSessionId, UUID activityId);


    WarmUp createWarmUp(WarmUpRequest warmUp, Course course);

    ReadWatchListen createReadWatchListen(ReadWatchListenRequest readWatchListenRequest, Course course);

    Assess createAssess(AssessRequest assessRequest, Course course);

    Break createBreak(BreakRequest breakRequest, Course course);

    Collaborate createCollaborate(CollaborateRequest collaborateRequest, Course course);

    Discuss createDiscuss(DiscussRequest discussRequest, Course course);

    Reflect createReflect(ReflectRequest reflectRequest, Course course);

    ResponseEntity<?> deleteActivity(UUID courseId, UUID sessionId, UUID activityId);

    ResponseEntity<Activity> updateActivity(Activity activityInfo, UUID id);
}

