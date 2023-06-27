package com.example.server.controller;

import com.example.server.model.Course;
import com.example.server.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
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

@RestController
@RequestMapping("v1/course")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CourseController {
  @Autowired
  private CourseService courseService;

  @GetMapping("/all-courses")
  public List<Course> getAllCourses() {
    return courseService.getAllCourses();
  }

  @GetMapping("/{id}")
  public Optional<Course> getCourseById(@PathVariable("id") Long id) {
    return courseService.getCourseById(id);
  }

  @PostMapping("/create-course")
  public ResponseEntity<Course> createCourse(@RequestBody Course course) {
    return ResponseEntity.ok(courseService.createCourse(course));
  }

  @PutMapping("/update-course/{id}")
  public ResponseEntity<Course> updateCourse(@PathVariable("id") Long id, @RequestBody Course newCourse) {
    return courseService.updateCourse(newCourse,id);
  }

  @DeleteMapping("/delete-course/{id}")
  public String deleteCourse(@PathVariable("id") Long id) {
    courseService.deleteCourse(id);
    return "";
  }




}
