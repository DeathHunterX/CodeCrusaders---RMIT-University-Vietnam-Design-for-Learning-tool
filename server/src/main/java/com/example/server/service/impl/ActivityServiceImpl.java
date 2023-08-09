package com.example.server.service.impl;

import com.example.server.api.request.ActivityRequest;
import com.example.server.api.response.ApiResponse;
import com.example.server.exception.ObjectNotFoundException;
import com.example.server.model.Activity;
import com.example.server.model.Course;
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
import org.modelmapper.ModelMapper;
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
    private final ModelMapper modelMapper;
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
    public Activity createActivity(ActivityRequest activityRequest, Course course) {
        switch (activityRequest.getActivityID()) {
            case "activity-01":
                WarmUp warmUp = new WarmUp();
                warmUp.setActivityID(ActivityID.WARM_UP);
                warmUp.setDuration(activityRequest.getDuration());
                warmUp.setActivityName(activityRequest.getActivityName());
                warmUp.setWarmUpOption(activityRequest.getWarmUpOption());
                warmUp.setEngagementOption(activityRequest.getEngagementOption());
                warmUp.setCourse(course);
                return activityRepository.save(warmUp);
            case "activity-02":
                ReadWatchListen readWatchListen = new ReadWatchListen();
                readWatchListen.setActivityID(ActivityID.READ_WATCH_LISTEN);
                readWatchListen.setDuration(activityRequest.getDuration());
                readWatchListen.setActivityName(activityRequest.getActivityName());
                readWatchListen.setCourse(course);
                return activityRepository.save(readWatchListen);
            case "activity-03":
                Reflect reflect = new Reflect();
                reflect.setActivityID(ActivityID.REFLECT);
                reflect.setDuration(activityRequest.getDuration());
                reflect.setActivityName(activityRequest.getActivityName());
                reflect.setReflectionType(activityRequest.getReflectionType());
                reflect.setCourse(course);
                return activityRepository.save(reflect);
            case "activity-04":
                Discuss discuss = new Discuss();
                discuss.setActivityID(ActivityID.DISCUSS);
                discuss.setDuration(activityRequest.getDuration());
                discuss.setActivityName(activityRequest.getActivityName());
                discuss.setGroupType(activityRequest.getGroupType());
                discuss.setCourse(course);
                return activityRepository.save(discuss);
            case "activity-05":
                Collaborate collaborate = new Collaborate();
                collaborate.setActivityID(ActivityID.COLLABORATE);
                collaborate.setDuration(activityRequest.getDuration());
                collaborate.setActivityName(activityRequest.getActivityName());
                collaborate.setCollaborateType(activityRequest.getCollaborateType());
                collaborate.setCourse(course);
                return activityRepository.save(collaborate);
            case "activity-06":
                Assess assess = new Assess();
                assess.setActivityID(ActivityID.ASSESS);
                assess.setDuration(activityRequest.getDuration());
                assess.setActivityName(activityRequest.getActivityName());
                assess.setAccessType(activityRequest.getAccessType());
                assess.setCourse(course);
                return activityRepository.save(assess);
            case "activity-07":
                Break breakAct = new Break();
                breakAct.setActivityID(ActivityID.BREAK);
                breakAct.setDuration(breakAct.getDuration());
                breakAct.setActivityName(breakAct.getActivityName());
                breakAct.setCourse(course);
                return activityRepository.save(breakAct);
            default:
                break;
        }
        return null;
    }

    @Override
    public Activity updateActivity(UUID activityId, ActivityRequest activityRequest) {
        switch (activityRequest.getActivityID()) {
            case "activity-01":
                WarmUp warmUp = (WarmUp) getActivityById(activityId);
                warmUp.setDuration(activityRequest.getDuration());
                warmUp.setActivityName(activityRequest.getActivityName());
                warmUp.setWarmUpOption(activityRequest.getWarmUpOption());
                warmUp.setEngagementOption(activityRequest.getEngagementOption());
                return activityRepository.save(warmUp);
            case "activity-02":
                ReadWatchListen readWatchListen = (ReadWatchListen) getActivityById(activityId);
                readWatchListen.setDuration(activityRequest.getDuration());
                readWatchListen.setActivityName(activityRequest.getActivityName());
                return activityRepository.save(readWatchListen);
            case "activity-03":
                Reflect reflect = (Reflect) getActivityById(activityId);
                reflect.setDuration(activityRequest.getDuration());
                reflect.setActivityName(activityRequest.getActivityName());
                reflect.setReflectionType(activityRequest.getReflectionType());
                return activityRepository.save(reflect);
            case "activity-04":
                Discuss discuss = (Discuss) getActivityById(activityId);
                discuss.setDuration(activityRequest.getDuration());
                discuss.setActivityName(activityRequest.getActivityName());
                discuss.setGroupType(activityRequest.getGroupType());
                return activityRepository.save(discuss);
            case "activity-05":
                Collaborate collaborate = (Collaborate) getActivityById(activityId);
                collaborate.setDuration(activityRequest.getDuration());
                collaborate.setActivityName(activityRequest.getActivityName());
                collaborate.setCollaborateType(activityRequest.getCollaborateType());
                return activityRepository.save(collaborate);
            case "activity-06":
                Assess assess = (Assess) getActivityById(activityId);
                assess.setDuration(activityRequest.getDuration());
                assess.setActivityName(activityRequest.getActivityName());
                assess.setAccessType(activityRequest.getAccessType());
                return activityRepository.save(assess);
            case "activity-07":
                Break breakAct = (Break) getActivityById(activityId);
                breakAct.setDuration(breakAct.getDuration());
                breakAct.setActivityName(breakAct.getActivityName());
                return activityRepository.save(breakAct);
            default:
                break;
        }
        return null;
    }


    @Override
    @Transactional
    public ResponseEntity<?> moveActivityToSession(UUID courseId, UUID sessionId, UUID activityId) {
        var user = userDetailsService.getCurrentUser();
        var course = courseService.getCourseById(courseId);
        if (user == null || !userDetailsService.checkCourseOwnership(user, course)) {
            return new ResponseEntity<>(new ApiResponse("You don't have permission to view/modify this course!"), HttpStatus.OK);
        }
        var session = sessionService.getSessionById(sessionId);
        var activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new ObjectNotFoundException("Activity", "id"));
        session.getActivityList().add(activity);
        activity.setSession(session);
        courseService.removeActivityFromCouse(course, activity);
        sessionRepository.save(session);
        return new ResponseEntity<>(session, HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<?> dragAndDropActivities(UUID courseId, UUID sessionId, List<Activity> leftActivities, List<Activity> rightActivities) {
        var user = userDetailsService.getCurrentUser();
        var course = courseService.getCourseById(courseId);
        if (user == null || !userDetailsService.checkCourseOwnership(user, course)) {
            return new ResponseEntity<>(new ApiResponse("You don't have permission to view/modify this course!"), HttpStatus.OK);
        }
        var session = sessionService.getSessionById(sessionId);
        course.getActivityList().clear();
        course.getActivityList().addAll(leftActivities);
        leftActivities.stream().forEach(e->e.setCourse(course));

        session.getActivityList().clear();
        session.getActivityList().addAll(rightActivities);
        rightActivities.stream().forEach(e->e.setSession(session));

        courseRepository.save(course);
        sessionRepository.save(session);
        return null;
    }

    @Override
    @Transactional
    public ResponseEntity<?> moveActivityBetweenSessions(UUID sessionId, UUID targetSessionId, UUID activityId) {
        var session = sessionService.getSessionById(sessionId);
        var targetSession = sessionService.getSessionById(targetSessionId);
        var activity = getActivityById(activityId);
        session.getActivityList().remove(activity);
        activity.setSession(null);
        targetSession.getActivityList().add(activity);
        activity.setSession(targetSession);
        sessionRepository.save(session);
        sessionRepository.save(targetSession);
        return new ResponseEntity<>(session, HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<?> removeActivityToSession(UUID courseId, UUID sessionId, UUID activityId) {
        var user = userDetailsService.getCurrentUser();
        var course = courseService.getCourseById(courseId);
        if (user == null || !userDetailsService.checkCourseOwnership(user, course)) {
            return new ResponseEntity<>(new ApiResponse("You don't have permission to view/modify this course!"), HttpStatus.OK);
        }
        var session = sessionService.getSessionById(sessionId);
        var activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new ObjectNotFoundException("Activity", "id"));
        courseService.addActivityToCourse(course, activity);
        session.getActivityList().remove(activity);
        activity.setSession(null);
        sessionRepository.save(session);
        courseRepository.save(course);
        return new ResponseEntity<>(session, HttpStatus.OK);
    }


//    @Override
//    public WarmUp createWarmUp(WarmUpRequest warmUpRequest, Course course) {
//        WarmUp warmUp = modelMapper.map(warmUpRequest, WarmUp.class);
//        warmUp.setCourse(course);
//        return activityRepository.save(warmUp);
//    }
//
//    @Override
//    public ReadWatchListen createReadWatchListen(ReadWatchListenRequest readWatchListenRequest, Course course) {
//        ReadWatchListen readWatchListen = modelMapper.map(readWatchListenRequest, ReadWatchListen.class);
//        readWatchListen.setCourse(course);
//        return activityRepository.save(readWatchListen);
//    }
//
//    @Override
//    public Assess createAssess(AssessRequest assessRequest, Course course) {
//        Assess assess = modelMapper.map(assessRequest, Assess.class);
//        assess.setCourse(course);
//        return activityRepository.save(assess);
//    }
//
//    @Override
//    public Break createBreak(BreakRequest breakRequest, Course course) {
//        Break breakAct = modelMapper.map(breakRequest, Break.class);
//        breakAct.setCourse(course);
//        return activityRepository.save(breakAct);
//    }
//
//    @Override
//    public Collaborate createCollaborate(CollaborateRequest collaborateRequest, Course course) {
//        Collaborate collaborate = modelMapper.map(collaborateRequest, Collaborate.class);
//        collaborate.setCourse(course);
//        return activityRepository.save(collaborate);
//    }
//
//    @Override
//    public Discuss createDiscuss(DiscussRequest discussRequest, Course course) {
//        Discuss discuss = modelMapper.map(discussRequest, Discuss.class);
//        discuss.setCourse(course);
//        return activityRepository.save(discuss);
//    }
//
//    @Override
//    public Reflect createReflect(ReflectRequest reflectRequest, Course course) {
//        Reflect reflect = modelMapper.map(reflectRequest, Reflect.class);
//        reflect.setCourse(course);
//        return activityRepository.save(reflect);
//    }
//
//    @Override
//    public WarmUp updateWarmUp(UUID activityId, WarmUpRequest warmUpRequest) {
//        var warmUp = (WarmUp) getActivityById(activityId);
//        warmUp.setWarmUpOption(warmUpRequest.getWarmUpOption());
//        warmUp.setDuration(warmUpRequest.getDuration());
//        warmUp.setEngagementOption(warmUpRequest.getEngagementOption());
//        return activityRepository.save(warmUp);
//    }
//
//    @Override
//    public ReadWatchListen updateReadWatchListen(UUID activityId, ReadWatchListenRequest readWatchListenRequest) {
//        var readWatchListen = (ReadWatchListen) getActivityById(activityId);
//        readWatchListen.setDuration(readWatchListenRequest.getDuration());
//        return activityRepository.save(readWatchListen);
//    }
//
//    @Override
//    public Reflect updateReflect(UUID activityId, ReflectRequest reflectRequest) {
//        var reflect = (Reflect) getActivityById(activityId);
//        reflect.setReflectionType(reflectRequest.getReflectionType());
//        reflect.setDuration(reflectRequest.getDuration());
//        return activityRepository.save(reflect);
//    }
//    @Override
//    public Discuss updateDiscuss(UUID activityId, DiscussRequest discussRequest) {
//        var discuss = (Discuss) getActivityById(activityId);
//        discuss.setGroupType(discussRequest.getGroupType());
//        discuss.setDuration(discussRequest.getDuration());
//        return activityRepository.save(discuss);
//    }
//
//    @Override
//    public Collaborate updateCollaborate(UUID activityId, CollaborateRequest collaborateRequest) {
//        var collaborate = (Collaborate) getActivityById(activityId);
//        collaborate.setCollaborateType(collaborateRequest.getCollaborateType());
//        collaborate.setDuration(collaborateRequest.getDuration());
//        return activityRepository.save(collaborate);
//    }
//
//    @Override
//    public Break updateBreak(UUID activityId, BreakRequest breakRequest) {
//        var breakAct = (Break) getActivityById(activityId);
//        breakAct.setDuration(breakRequest.getDuration());
//        return activityRepository.save(breakAct);
//    }
//
//    @Override
//    public Assess updateAssess(UUID activityId, AssessRequest assessRequest) {
//        var assess = (Assess) getActivityById(activityId);
//        assess.setAccessType(assessRequest.getAccessType());
//        assess.setDuration(assessRequest.getDuration());
//        return activityRepository.save(assess);
//    }

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
        course.getActivityList().remove(activity);
        activity.setCourse(null);
        session.getActivityList().remove(activity);
        activity.setSession(null);
        courseRepository.save(course);
        sessionRepository.save(session);
        activityRepository.deleteById(activityId);
        return new ResponseEntity<>(new ApiResponse("Successfully delete activity"), HttpStatus.OK);
    }

}
