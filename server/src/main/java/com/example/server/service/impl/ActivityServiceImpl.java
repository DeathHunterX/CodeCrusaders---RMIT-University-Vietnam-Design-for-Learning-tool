package com.example.server.service.impl;

import com.example.server.api.request.ActivityListRequest;
import com.example.server.api.request.ActivityRequest;
import com.example.server.api.response.ApiResponse;
import com.example.server.exception.ObjectNotFoundException;
import com.example.server.model.Activity;
import com.example.server.model.Course;
import com.example.server.model.Session;
import com.example.server.model.activities.*;
import com.example.server.model.enums.ActivityID;
import com.example.server.repository.ActivityRepository;
import com.example.server.repository.CourseRepository;
import com.example.server.repository.SessionRepository;
import com.example.server.service.ActivityService;
import com.example.server.service.CourseService;
import com.example.server.service.SessionService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements ActivityService {
    private final ActivityRepository activityRepository;
    private final SessionService sessionService;
    private final CourseService courseService;
    private final UserDetailsServiceImpl userDetailsService;
    private final CourseRepository courseRepository;
    private final SessionRepository sessionRepository;

    @Override
    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    @Override
    public Activity getActivityById(UUID id) {
        return activityRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Activity", "id"));
    }

    @Override
    @Transactional
    public Activity createActivity(ActivityRequest activityRequest, Course course, Session session) {
        switch (activityRequest.getActivityID()) {
            case "warm_up" -> {
                WarmUp warmUp = new WarmUp();
                warmUp.setActivityID(ActivityID.WARM_UP);
                warmUp.setDuration(activityRequest.getDuration());
                warmUp.setActivityName(activityRequest.getActivityName());
                warmUp.setWarmUpOption(activityRequest.getWarmUpOption());
                warmUp.setEngagementOption(activityRequest.getEngagementOption());
                warmUp.setSession(session);
                return activityRepository.save(warmUp);
            }
            case "read_watch_listen" -> {
                ReadWatchListen readWatchListen = new ReadWatchListen();
                readWatchListen.setActivityID(ActivityID.READ_WATCH_LISTEN);
                readWatchListen.setDuration(activityRequest.getDuration());
                readWatchListen.setActivityName(activityRequest.getActivityName());
                readWatchListen.setReadWatchListenType(activityRequest.getReadWatchListenType());
                readWatchListen.setSession(session);
                return activityRepository.save(readWatchListen);
            }
            case "reflect" -> {
                Reflect reflect = new Reflect();
                reflect.setActivityID(ActivityID.REFLECT);
                reflect.setDuration(activityRequest.getDuration());
                reflect.setActivityName(activityRequest.getActivityName());
                reflect.setReflectionType(activityRequest.getReflectionType());
                reflect.setSession(session);
                return activityRepository.save(reflect);
            }
            case "discuss" -> {
                Discuss discuss = new Discuss();
                discuss.setActivityID(ActivityID.DISCUSS);
                discuss.setDuration(activityRequest.getDuration());
                discuss.setActivityName(activityRequest.getActivityName());
                discuss.setGroupType(activityRequest.getGroupType());
                discuss.setSession(session);
                return activityRepository.save(discuss);
            }
            case "collaborate" -> {
                Collaborate collaborate = new Collaborate();
                collaborate.setActivityID(ActivityID.COLLABORATE);
                collaborate.setDuration(activityRequest.getDuration());
                collaborate.setActivityName(activityRequest.getActivityName());
                collaborate.setCollaborateType(activityRequest.getCollaborateType());
                collaborate.setSession(session);
                return activityRepository.save(collaborate);
            }
            case "assess" -> {
                Access access = new Access();
                access.setActivityID(ActivityID.ASSESS);
                access.setDuration(activityRequest.getDuration());
                access.setActivityName(activityRequest.getActivityName());
                access.setAccessType(activityRequest.getAccessType());
                access.setSession(session);
                return activityRepository.save(access);
            }
            case "break" -> {
                Break breakAct = new Break();
                breakAct.setActivityID(ActivityID.BREAK);
                breakAct.setDuration(activityRequest.getDuration());
                breakAct.setActivityName(activityRequest.getActivityName());
                breakAct.setBreakType(activityRequest.getBreakType());
                breakAct.setSession(session);
                return activityRepository.save(breakAct);
            }
            default -> {
                throw new ObjectNotFoundException("Activity","format");
            }
        }
    }

    @Override
    public Activity updateActivity(UUID activityId, ActivityRequest activityRequest) {
        switch (activityRequest.getActivityID()) {
            case "warm_up" -> {
                WarmUp warmUp = (WarmUp) getActivityById(activityId);
                warmUp.setDuration(activityRequest.getDuration());
                warmUp.setActivityName(activityRequest.getActivityName());
                warmUp.setWarmUpOption(activityRequest.getWarmUpOption());
                warmUp.setEngagementOption(activityRequest.getEngagementOption());
                return activityRepository.save(warmUp);
            }
            case "read_watch_listen" -> {
                ReadWatchListen readWatchListen = (ReadWatchListen) getActivityById(activityId);
                readWatchListen.setDuration(activityRequest.getDuration());
                readWatchListen.setActivityName(activityRequest.getActivityName());
                readWatchListen.setReadWatchListenType(activityRequest.getReadWatchListenType());
                return activityRepository.save(readWatchListen);
            }
            case "reflect" -> {
                Reflect reflect = (Reflect) getActivityById(activityId);
                reflect.setDuration(activityRequest.getDuration());
                reflect.setActivityName(activityRequest.getActivityName());
                reflect.setReflectionType(activityRequest.getReflectionType());
                return activityRepository.save(reflect);
            }
            case "discuss" -> {
                Discuss discuss = (Discuss) getActivityById(activityId);
                discuss.setDuration(activityRequest.getDuration());
                discuss.setActivityName(activityRequest.getActivityName());
                discuss.setGroupType(activityRequest.getGroupType());
                return activityRepository.save(discuss);
            }
            case "collaborate" -> {
                Collaborate collaborate = (Collaborate) getActivityById(activityId);
                collaborate.setDuration(activityRequest.getDuration());
                collaborate.setActivityName(activityRequest.getActivityName());
                collaborate.setCollaborateType(activityRequest.getCollaborateType());
                return activityRepository.save(collaborate);
            }
            case "assess" -> {
                Access access = (Access) getActivityById(activityId);
                access.setDuration(activityRequest.getDuration());
                access.setActivityName(activityRequest.getActivityName());
                access.setAccessType(activityRequest.getAccessType());
                return activityRepository.save(access);
            }
            case "break" -> {
                Break breakAct = (Break) getActivityById(activityId);
                breakAct.setDuration(activityRequest.getDuration());
                breakAct.setActivityName(activityRequest.getActivityName());
                breakAct.setBreakType(activityRequest.getBreakType());
                return activityRepository.save(breakAct);
            }
            default -> {
                throw new ObjectNotFoundException("Activity","format");
            }
        }
    }


    @Override
    @Transactional
    public ApiResponse dragAndDropActivities(UUID courseId, UUID moduleId, ActivityListRequest activityListRequest) {
        var user = userDetailsService.getCurrentUser();
        var course = courseService.getCourseById(courseId);
        if (user == null || !userDetailsService.checkCourseOwnership(user, course)) {
            return new ApiResponse("You don't have permission to view/modify this course!");
        }
        var preClass = sessionService.getSessionById(activityListRequest.getPreClassId());
        var inClass = sessionService.getSessionById(activityListRequest.getInClassId());
        var postClass = sessionService.getSessionById(activityListRequest.getPostClassId());
        var preClassActReq = activityListRequest.getPreClassActivities();
        var inClassActReq = activityListRequest.getInClassActivities();
        var postClassActReq = activityListRequest.getPostClassActivities();

        preClass.getActivityList().clear();
        preClass.setActivityList(preClassActReq);
        preClassActReq.forEach(e->e.setSession(preClass));
        sessionRepository.save(preClass);

        inClass.getActivityList().clear();
        inClass.setActivityList(inClassActReq);
        inClassActReq.forEach(e->e.setSession(inClass));
        sessionRepository.save(inClass);

        postClass.getActivityList().clear();
        postClass.setActivityList(postClassActReq);
        postClassActReq.forEach(e->e.setSession(postClass));
        sessionRepository.save(postClass);
        return new ApiResponse("Successfully update activity list");
    }

    @Override
    @Transactional
    public ResponseEntity<?> deleteActivity(UUID courseId, UUID sessionId, UUID activityId) {
        var user = userDetailsService.getCurrentUser();
        var course = courseService.getCourseById(courseId);
        if (user == null || !userDetailsService.checkCourseOwnership(user, course)) {
            return new ResponseEntity<>(new ApiResponse("You don't have permission to view/modify this course!"), HttpStatus.OK);
        }
        var session = sessionService.getSessionById(sessionId);
        var activity = getActivityById(activityId);
        session.getActivityList().remove(activity);
        activity.setSession(null);
        courseRepository.save(course);
        sessionRepository.save(session);
        activityRepository.deleteById(activityId);
        return new ResponseEntity<>(new ApiResponse("Successfully delete activity"), HttpStatus.OK);
    }

}
