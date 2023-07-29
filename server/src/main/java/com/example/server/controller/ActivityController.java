package com.example.server.controller;

import com.example.server.api.request.activity.*;
import com.example.server.api.response.ApiResponse;
import com.example.server.model.*;
import com.example.server.service.ActivityService;
import com.example.server.service.CourseService;
import com.example.server.service.SessionService;
import com.example.server.service.impl.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("v1/api")
@RequiredArgsConstructor
public class ActivityController {
    private final CourseService courseService;
    private final ActivityService activityService;
    private final UserDetailsServiceImpl userDetailsService;

    @GetMapping("activities/test")
    public List<Activity> getAllActivities() {
        return activityService.getAllActivities();
    }

    @GetMapping("activities/{id}")
    public Activity getAllActivities(@PathVariable("id") UUID id) {
        return activityService.getActivityById(id);
    }

    @PutMapping("courses/{course_id}/sessions/{session_id}/add-activity/{activity_id}")
    public ResponseEntity<?> addActivityToSession(
            @PathVariable("course_id") UUID courseId,
            @PathVariable("session_id") UUID sessionId,
            @PathVariable("activity_id") UUID activityId) {
        return new ResponseEntity<>(activityService.moveActivityToSession(courseId, sessionId, activityId), HttpStatus.OK);
    }

    @PutMapping("courses/{course_id}/sessions/{session_id}/remove-activity/{activity_id}")
    public ResponseEntity<?> removeActivityFromSession(
            @PathVariable("course_id") UUID courseId,
            @PathVariable("session_id") UUID sessionId,
            @PathVariable("activity_id") UUID activityId) {
        return new ResponseEntity<>(activityService.removeActivityToSession(courseId, sessionId, activityId), HttpStatus.OK);
    }

    @PutMapping("sessions/{session_id}/activities/{activity_id}/move-to/{target_session_id}")
    public ResponseEntity<?> moveActivityBetweenSessions(
            @PathVariable("session_id") UUID sessionId,
            @PathVariable("target_session_id") UUID targetSessionId,
            @PathVariable("activity_id") UUID activityId) {
        return new ResponseEntity<>(activityService.moveActivityBetweenSessions(sessionId, targetSessionId, activityId), HttpStatus.OK);
    }


    @PostMapping("courses/{course_id}/create-warm-up")
    public ResponseEntity<?> createWarmUp(@PathVariable("course_id") UUID courseId, @RequestBody WarmUpRequest warmUpRequest) {
        User user = userDetailsService.getCurrentUser();
        Course course = courseService.getCourseById(courseId);
        if (user == null || !userDetailsService.checkCourseOwnership(user, course)) {
            return new ResponseEntity<>(new ApiResponse("You don't have permission to view/modify this course!"), HttpStatus.OK);
        }
        return new ResponseEntity<>(activityService.createWarmUp(warmUpRequest, course), HttpStatus.OK);
    }

    @PostMapping("courses/{course_id}/create-read-watch-listen")
    public ResponseEntity<?> createReadWatchListen(@PathVariable("course_id") UUID courseId, @RequestBody ReadWatchListenRequest readWatchListenRequest) {
        User user = userDetailsService.getCurrentUser();
        Course course = courseService.getCourseById(courseId);
        if (user == null || !userDetailsService.checkCourseOwnership(user, course)) {
            return new ResponseEntity<>(new ApiResponse("You don't have permission to view/modify this course!"), HttpStatus.OK);
        }
        return new ResponseEntity<>(activityService.createReadWatchListen(readWatchListenRequest, course), HttpStatus.OK);
    }

    @PostMapping("courses/{course_id}/create-assess")
    public ResponseEntity<?> createAssess(@PathVariable("course_id") UUID courseId, @RequestBody AssessRequest assessRequest) {
        User user = userDetailsService.getCurrentUser();
        Course course = courseService.getCourseById(courseId);
        if (user == null || !userDetailsService.checkCourseOwnership(user, course)) {
            return new ResponseEntity<>(new ApiResponse("You don't have permission to view/modify this course!"), HttpStatus.OK);
        }
        return new ResponseEntity<>(activityService.createAssess(assessRequest, course), HttpStatus.OK);
    }

    @PostMapping("courses/{course_id}/create-break")
    public ResponseEntity<?> createBreak(@PathVariable("course_id") UUID courseId, @RequestBody BreakRequest breakRequest) {
        User user = userDetailsService.getCurrentUser();
        Course course = courseService.getCourseById(courseId);
        if (user == null || !userDetailsService.checkCourseOwnership(user, course)) {
            return new ResponseEntity<>(new ApiResponse("You don't have permission to view/modify this course!"), HttpStatus.OK);
        }
        return new ResponseEntity<>(activityService.createBreak(breakRequest, course), HttpStatus.OK);
    }

    @PostMapping("courses/{course_id}/create-collaborate")
    public ResponseEntity<?> createCollaborate(@PathVariable("course_id") UUID courseId, @RequestBody CollaborateRequest collaborateRequest) {
        User user = userDetailsService.getCurrentUser();
        Course course = courseService.getCourseById(courseId);
        if (user == null || !userDetailsService.checkCourseOwnership(user, course)) {
            return new ResponseEntity<>(new ApiResponse("You don't have permission to view/modify this course!"), HttpStatus.OK);
        }
        return new ResponseEntity<>(activityService.createCollaborate(collaborateRequest, course), HttpStatus.OK);
    }

    @PostMapping("courses/{course_id}/create-discuss")
    public ResponseEntity<?> createDiscuss(@PathVariable("course_id") UUID courseId, @RequestBody DiscussRequest discussRequest) {
        User user = userDetailsService.getCurrentUser();
        Course course = courseService.getCourseById(courseId);
        if (user == null || !userDetailsService.checkCourseOwnership(user, course)) {
            return new ResponseEntity<>(new ApiResponse("You don't have permission to view/modify this course!"), HttpStatus.OK);
        }
        return new ResponseEntity<>(activityService.createDiscuss(discussRequest, course), HttpStatus.OK);
    }

    @PostMapping("courses/{course_id}/create-reflect")
    public ResponseEntity<?> createReflect(@PathVariable("course_id") UUID courseId, @RequestBody ReflectRequest reflectRequest) {
        User user = userDetailsService.getCurrentUser();
        Course course = courseService.getCourseById(courseId);
        if (user == null || !userDetailsService.checkCourseOwnership(user, course)) {
            return new ResponseEntity<>(new ApiResponse("You don't have permission to view/modify this course!"), HttpStatus.OK);
        }
        return new ResponseEntity<>(activityService.createReflect(reflectRequest, course), HttpStatus.OK);
    }

    @DeleteMapping("courses/{course_id}/sessions/{session_id}/activities/{activity_id}")
    public ResponseEntity<?> deleteActivity(
            @PathVariable("course_id") UUID courseId,
            @PathVariable("activity_id") UUID activityId,
            @PathVariable("session_id") UUID sessionId) {
        return activityService.deleteActivity(courseId, sessionId, activityId);
    }

}
