package com.example.server.controller;

import com.example.server.api.request.ActivityListRequest;
import com.example.server.api.request.ActivityRequest;
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
    private final SessionService sessionService;

    @GetMapping("activities/test")
    public List<Activity> getAllActivities() {
        return activityService.getAllActivities();
    }

    @GetMapping("activities/{id}")
    public Activity getActivityById(@PathVariable("id") UUID id) {
        return activityService.getActivityById(id);
    }

    @PostMapping("courses/{course_id}/sessions/{session_id}/create-activity")
    public ResponseEntity<?> createActivity(@PathVariable("course_id") UUID courseId, @PathVariable("session_id") UUID sessionId, @RequestBody ActivityRequest activityRequest) {
        User user = userDetailsService.getCurrentUser();
        Course course = courseService.getCourseById(courseId);
        Session session = sessionService.getSessionById(sessionId);
        if (user == null || !userDetailsService.checkCourseOwnership(user, course)) {
            return new ResponseEntity<>(new ApiResponse("You don't have permission to view/modify this course!"), HttpStatus.OK);
        }
        return new ResponseEntity<>(activityService.createActivity(activityRequest,course,session),HttpStatus.OK);
    }

    @PutMapping("courses/{course_id}/activities/{activity_id}/update-activity")
    public ResponseEntity<?> updateActivity(@PathVariable("course_id") UUID courseId, @PathVariable("activity_id") UUID activityId, @RequestBody ActivityRequest activityRequest) {
        User user = userDetailsService.getCurrentUser();
        Course course = courseService.getCourseById(courseId);
        if (user == null || !userDetailsService.checkCourseOwnership(user, course)) {
            return new ResponseEntity<>(new ApiResponse("You don't have permission to view/modify this course!"), HttpStatus.OK);
        }
        return new ResponseEntity<>(activityService.updateActivity(activityId, activityRequest), HttpStatus.OK);
    }

    @PutMapping("courses/{course_id}/modules/{module_id}/save-activity-lists")
    public ResponseEntity<?> updateActivityList(@PathVariable("course_id") UUID courseId, @PathVariable("module_id") UUID moduleId, @RequestBody ActivityListRequest activityListRequest) {
        return new ResponseEntity<>(activityService.dragAndDropActivities(courseId, moduleId, activityListRequest),HttpStatus.OK);
    }

    @DeleteMapping("courses/{course_id}/sessions/{session_id}/activities/{activity_id}")
    public ResponseEntity<?> deleteActivity(
            @PathVariable("course_id") UUID courseId,
            @PathVariable("activity_id") UUID activityId,
            @PathVariable("session_id") UUID sessionId) {
        return activityService.deleteActivity(courseId, sessionId, activityId);
    }

}
