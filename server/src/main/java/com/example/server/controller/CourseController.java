package com.example.server.controller;

//import com.example.server.api.response.CourseResponse;
import com.example.server.api.request.CourseRequest;
import com.example.server.api.response.CourseResponse;
import com.example.server.model.Course;
import com.example.server.service.CourseService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.internal.asm.commons.SimpleRemapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("v1/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class CourseController {
  private final CourseService courseService;

  @GetMapping("courses")
  public List<CourseResponse> getAllCourses() {
    return courseService.getAllCourses();
  }

  @GetMapping("courses/{id}")
  public Course getCourseById( @PathVariable("id") UUID id) {
    return courseService.getCourseById(id);
  }

  @GetMapping("courses/{course_id}/modules")
  public ResponseEntity<?> getAllModulesByCourseId(@PathVariable UUID course_id) {
    Course course = courseService.getCourseById(course_id);
    return new ResponseEntity<>(course.getModuleList(),HttpStatus.OK);
  }
  @PostMapping("/create-course")
  public ResponseEntity<Course> createCourse(@RequestBody CourseRequest courseRequest) {
    return ResponseEntity.ok(courseService.createCourse(courseRequest));
  }

  @PutMapping("/update-course/{id}")
  public ResponseEntity<Course> updateCourse(@PathVariable("id") UUID id, @RequestBody Course newCourse) {
    return courseService.updateCourse(newCourse,id);
  }

  @DeleteMapping("/delete-course/{id}")
  public String deleteCourse(@PathVariable("id") UUID id) {
    courseService.deleteCourse(id);
    return "";
  }




}
