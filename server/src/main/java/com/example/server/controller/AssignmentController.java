package com.example.server.controller;

import com.example.server.model.Assignment;
import com.example.server.model.Course;
import com.example.server.service.AssignmentService;
import com.example.server.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("v1/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class AssignmentController {
    private final AssignmentService assignmentService;
    private final CourseService courseService;

    @GetMapping("assignments")
    public List<Assignment> getAllAssignments() {
        return assignmentService.getAllAssignments();
    }

    @GetMapping("courses/{course_id}/assignments")
    public List<Assignment> getAllAssignmentsByCourseId(@PathVariable("course_id") UUID courseId) {
        Course course = courseService.getCourseById(courseId);
        return course.getAssignmentList();
    }
}
