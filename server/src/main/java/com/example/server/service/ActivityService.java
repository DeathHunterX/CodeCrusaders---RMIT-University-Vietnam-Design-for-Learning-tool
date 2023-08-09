package com.example.server.service;

import com.example.server.api.request.ActivityRequest;
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

    Activity createActivity(ActivityRequest activityRequest, Course course);

    Activity updateActivity(UUID activityId, ActivityRequest activityRequest);

    ResponseEntity<?> moveActivityToSession(UUID courseId, UUID sessionId, UUID activityId);

    ResponseEntity<?> dragAndDropActivities(UUID courseId, UUID sessionId, List<Activity> leftActivities, List<Activity> rightActivities);

    ResponseEntity<?> removeActivityToSession(UUID courseId, UUID sessionId, UUID activityId);

    ResponseEntity<?> moveActivityBetweenSessions(UUID sessionId, UUID targetSessionId, UUID activityId);


//    WarmUp createWarmUp(WarmUpRequest warmUp, Course course);
//
//    ReadWatchListen createReadWatchListen(ReadWatchListenRequest readWatchListenRequest, Course course);
//
//    Assess createAssess(AssessRequest assessRequest, Course course);
//
//    Break createBreak(BreakRequest breakRequest, Course course);
//
//    Collaborate createCollaborate(CollaborateRequest collaborateRequest, Course course);
//
//    Discuss createDiscuss(DiscussRequest discussRequest, Course course);
//
//    Reflect createReflect(ReflectRequest reflectRequest, Course course);
//
//    WarmUp updateWarmUp(UUID activityId,WarmUpRequest warmUp);
//    ReadWatchListen updateReadWatchListen(UUID activityId,ReadWatchListenRequest readWatchListenRequest);
//    Reflect updateReflect(UUID activityId,ReflectRequest reflectRequest);
//    Discuss updateDiscuss(UUID activityId,DiscussRequest discussRequest);
//    Collaborate updateCollaborate(UUID activityId,CollaborateRequest collaborateRequest);
//    Break updateBreak(UUID activityId,BreakRequest breakRequest);
//    Assess updateAssess(UUID activityId,AssessRequest assessRequest);


    ResponseEntity<?> deleteActivity(UUID courseId, UUID sessionId, UUID activityId);
}

