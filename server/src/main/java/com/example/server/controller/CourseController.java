package com.example.server.controller;

import com.example.server.api.request.CourseRequest;
import com.example.server.api.request.CourseUpdateRequest;
import com.example.server.api.response.ApiResponse;
import com.example.server.model.Activity;
import com.example.server.model.Course;
import com.example.server.model.User;
import com.example.server.repository.UserRepository;
import com.example.server.service.ActivityService;
import com.example.server.service.CourseService;
import com.example.server.service.impl.UserDetailsServiceImpl;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("v1/api")
@RequiredArgsConstructor
public class CourseController {
  private final CourseService courseService;
  private final UserDetailsServiceImpl userDetailsService;
  private final ModelMapper modelMapper;
  private final UserRepository userRepository;
  private final ActivityService activityService;

  @GetMapping("courses")
  public ResponseEntity<?> getAllCourses() {
    User user = userDetailsService.getCurrentUser();
    if (user == null) {
      return new ResponseEntity<>(new ApiResponse("You don't have permission to view courses"), HttpStatus.OK);
    }
    return new ResponseEntity<>(courseService.getAllCoursesByUsername(user.getUsername()), HttpStatus.OK);
  }

  @GetMapping("all-courses")
  public ResponseEntity<?> getAllCoursesFromCurrentUser() {
    User user = userDetailsService.getCurrentUser();
    if (user == null) {
      return new ResponseEntity<>(new ApiResponse("You don't have permission to view courses"), HttpStatus.OK);
    }
    Set<Course> courseSet = user.getCourses();
    Map<String, Set<Course>> response = new HashMap<>();
    response.put("courses", courseSet);
    return ResponseEntity.ok(response);
  }


  @GetMapping("courses/{id}")
  public ResponseEntity<?> getCourseById(@PathVariable("id") UUID id) {
    User user = userDetailsService.getCurrentUser();
    Course course = courseService.getCourseById(id);
    if (user == null || !userDetailsService.checkCourseOwnership(user, course)) {
      return new ResponseEntity<>(new ApiResponse("You don't have permission to view/modify this course!"), HttpStatus.OK);
    }
    return new ResponseEntity<>(courseService.getCourseById(id), HttpStatus.OK);
  }

  @GetMapping("courses/{course_id}/modules")
  public ResponseEntity<?> getAllModulesByCourseId(@PathVariable UUID course_id) {
    Course course = courseService.getCourseById(course_id);
    return new ResponseEntity<>(course.getModuleList(), HttpStatus.OK);
  }

  @PostMapping("/create-course")
  public ResponseEntity<?> createCourse(@RequestBody CourseRequest courseRequest) {
    User user = userDetailsService.getCurrentUser();
    if (user == null) {
      return new ResponseEntity<>(new ApiResponse("You cannot create a course!"), HttpStatus.OK);
    }
    return ResponseEntity.ok(courseService.createCourse(courseRequest, user));
  }

  @PutMapping("/update-course/{id}")
  public ResponseEntity<?> updateCourse(@PathVariable("id") UUID id, @RequestBody CourseUpdateRequest newCourse) {
    return courseService.updateCourse(newCourse, id);
  }

  @DeleteMapping("/delete-course/{id}")
  public ResponseEntity<?> deleteCourse(@PathVariable("id") UUID id) {
    User user = userDetailsService.getCurrentUser();
    Course course = courseService.getCourseById(id);
    if (user == null || !userDetailsService.checkCourseOwnership(user, course)) {
      return new ResponseEntity<>(new ApiResponse("You don't have permission to view/modify this course!"), HttpStatus.OK);
    }
    if (course != null) {
      Set<Course> newCourseSet = user.getCourses().stream().filter(e -> !e.getId().equals(course.getId())).collect(Collectors.toSet());
      user.setCourses(newCourseSet);
      userRepository.save(user);
    }
    return new ResponseEntity<>(new ApiResponse("Successfully delete course"), HttpStatus.OK);
  }
}
