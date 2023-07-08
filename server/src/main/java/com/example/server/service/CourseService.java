package com.example.server.service;

import com.example.server.api.response.CourseResponse;
import com.example.server.model.Course;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface CourseService {
  List<Course> getAllCourses();
  Optional<Course> getCourseById(Long id);

  Course createCourse(Course course);
  void deleteCourse(Long id);

  ResponseEntity<Course> updateCourse(Course newCourse, Long id);
}
