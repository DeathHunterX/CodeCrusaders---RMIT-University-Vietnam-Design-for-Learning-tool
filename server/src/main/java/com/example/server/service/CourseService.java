package com.example.server.service;

import com.example.server.api.request.CourseRequest;
import com.example.server.api.response.CourseResponse;
import com.example.server.model.Course;
import com.example.server.model.User;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

public interface CourseService {
    List<CourseResponse> getAllCourses();

    List<CourseResponse> getAllCoursesByUsername(String username);


    Course getCourseById(UUID id);
    Course createCourse(CourseRequest courseRequest, User user);
    void deleteCourse(UUID id);

    ResponseEntity<?> updateCourse(Course newCourse, UUID id);
}
