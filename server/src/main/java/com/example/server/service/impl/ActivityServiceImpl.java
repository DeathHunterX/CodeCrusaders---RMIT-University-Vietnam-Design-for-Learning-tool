package com.example.server.service.impl;

import com.example.server.api.request.activity.*;
import com.example.server.api.response.ApiResponse;
import com.example.server.exception.ObjectNotFoundException;
import com.example.server.model.Activity;
import com.example.server.model.Course;
import com.example.server.model.User;
import com.example.server.model.activities.*;
import com.example.server.model.enums.ActivityType;
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
import java.util.Optional;
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
    public Activity createActivity(String activityType, Course course) {
        switch (activityType) {
            case "activity-01":
                WarmUp warmUp = new WarmUp();
                warmUp.setActivityType(ActivityType.WARM_UP);
                warmUp.setCourse(course);
                return activityRepository.save(warmUp);
            case "activity-02":
                ReadWatchListen readWatchListen = new ReadWatchListen();
                readWatchListen.setActivityType(ActivityType.READ_WATCH_LISTEN);
                readWatchListen.setCourse(course);
                return activityRepository.save(readWatchListen);
            case "activity-03":
                Reflect reflect = new Reflect();
                reflect.setActivityType(ActivityType.REFLECT);
                reflect.setCourse(course);
                return activityRepository.save(reflect);
            case "activity-04":
                Discuss discuss = new Discuss();
                discuss.setActivityType(ActivityType.DISCUSS);
                discuss.setCourse(course);
                return activityRepository.save(discuss);
            case "activity-05":
                Collaborate collaborate = new Collaborate();
                collaborate.setActivityType(ActivityType.COLLABORATE);
                collaborate.setCourse(course);
                return activityRepository.save(collaborate);
            case "activity-06":
                Assess assess = new Assess();
                assess.setActivityType(ActivityType.ASSESS);
                assess.setCourse(course);
                return activityRepository.save(assess);
            case "activity-07":
                Break breakAct = new Break();
                breakAct.setActivityType(ActivityType.BREAK);
                breakAct.setCourse(course);
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


    @Override
    public WarmUp createWarmUp(WarmUpRequest warmUpRequest, Course course) {
        WarmUp warmUp = modelMapper.map(warmUpRequest, WarmUp.class);
        warmUp.setCourse(course);
        return activityRepository.save(warmUp);
    }

    @Override
    public ReadWatchListen createReadWatchListen(ReadWatchListenRequest readWatchListenRequest, Course course) {
        ReadWatchListen readWatchListen = modelMapper.map(readWatchListenRequest, ReadWatchListen.class);
        readWatchListen.setCourse(course);
        return activityRepository.save(readWatchListen);
    }

    @Override
    public Assess createAssess(AssessRequest assessRequest, Course course) {
        Assess assess = modelMapper.map(assessRequest, Assess.class);
        assess.setCourse(course);
        return activityRepository.save(assess);
    }

    @Override
    public Break createBreak(BreakRequest breakRequest, Course course) {
        Break breakAct = modelMapper.map(breakRequest, Break.class);
        breakAct.setCourse(course);
        return activityRepository.save(breakAct);
    }

    @Override
    public Collaborate createCollaborate(CollaborateRequest collaborateRequest, Course course) {
        Collaborate collaborate = modelMapper.map(collaborateRequest, Collaborate.class);
        collaborate.setCourse(course);
        return activityRepository.save(collaborate);
    }

    @Override
    public Discuss createDiscuss(DiscussRequest discussRequest, Course course) {
        Discuss discuss = modelMapper.map(discussRequest, Discuss.class);
        discuss.setCourse(course);
        return activityRepository.save(discuss);
    }

    @Override
    public Reflect createReflect(ReflectRequest reflectRequest, Course course) {
        Reflect reflect = modelMapper.map(reflectRequest, Reflect.class);
        reflect.setCourse(course);
        return activityRepository.save(reflect);
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
        course.getActivityList().remove(activity);
        activity.setCourse(null);
        session.getActivityList().remove(activity);
        activity.setSession(null);
        courseRepository.save(course);
        sessionRepository.save(session);
        activityRepository.deleteById(activityId);
        return new ResponseEntity<>(new ApiResponse("Successfully delete activity"), HttpStatus.OK);
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
