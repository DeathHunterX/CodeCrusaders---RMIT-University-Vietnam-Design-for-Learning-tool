package com.example.server.service;

import com.example.server.api.request.CourseRequest;
import com.example.server.api.response.CourseResponse;
import com.example.server.model.Course;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface CourseService {
  List<CourseResponse> getAllCourses();
  Optional<Course> getCourseById(Long id);
  Course createCourse(CourseRequest CourseRequest);
  void deleteCourse(Long id);

  ResponseEntity<Course> updateCourse(Course newCourse, Long id);
}
