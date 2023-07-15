package com.example.server.service;

import com.example.server.api.request.CourseRequest;
import com.example.server.api.response.CourseResponse;
import com.example.server.model.Course;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

public interface CourseService {
  List<CourseResponse> getAllCourses();
  Course getCourseById(UUID id);
  Course createCourse(CourseRequest CourseRequest);
  void deleteCourse(UUID id);

  ResponseEntity<Course> updateCourse(Course newCourse, UUID id);
}
