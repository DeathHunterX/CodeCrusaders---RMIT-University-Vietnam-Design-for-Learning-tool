package com.example.server.controller;

//import com.example.server.api.response.CourseResponse;
import com.example.server.api.request.CourseRequest;
import com.example.server.api.response.CourseResponse;
import com.example.server.exception.ObjectNotFoundException;
import com.example.server.model.Course;
import com.example.server.model.User;
import com.example.server.repository.CourseRepository;
import com.example.server.repository.UserRepository;
import com.example.server.service.CourseService;
import com.example.server.service.impl.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("v1/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class CourseController {
  private final CourseService courseService;
  private final UserDetailsServiceImpl userDetailsService;
  private final ModelMapper modelMapper;
  private final UserRepository userRepository;
  private final CourseRepository courseRepository;

  @GetMapping("courses")
  public List<CourseResponse> getAllCourses(@RequestHeader("UserID") UUID userId) {
    Optional<User> user = userDetailsService.getUserById(userId);
    if(!user.isPresent()) {
      throw new ObjectNotFoundException("user","id");
    }
    Set<Course> courseSet = user.get().getCourses();
    return courseSet.stream().map(e->modelMapper.map(e,CourseResponse.class)).collect(Collectors.toList());
  }

  @GetMapping("courses/{id}")
  public Course getCourseById( @PathVariable("id") UUID id, @RequestHeader("UserID") UUID userId) {
    Optional<User> user = userDetailsService.getUserById(userId);
    if(!user.isPresent()) {
      throw new ObjectNotFoundException("user","id");
    }
    User _user = user.get();
    List<Course> courseList = _user.getCourses().stream().filter(e->e.getId().equals(id)).collect(Collectors.toList());
    if(courseList.size()==0) {
      throw new ObjectNotFoundException("course", "id");
    }
    return courseList.get(0);
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
  public ResponseEntity<?> updateCourse(@PathVariable("id") UUID id, @RequestBody Course newCourse, @RequestHeader("UserID") UUID userId) {
    Optional<User> user = userDetailsService.getUserById(userId);
    if(!user.isPresent()) {
      throw new ObjectNotFoundException("user","id");
    }
    Course course = courseService.getCourseById(id);
    for(Course c : user.get().getCourses()) {
      System.out.println(c.getCourseName());
    }
//    System.out.println(user.get().getCourses());
    List<Course> updatedCourse = user.get().getCourses().stream().filter(e->e.getId().equals(course.getId())).collect(Collectors.toList());
    if(updatedCourse == null) {
      return new ResponseEntity<>("No permission to update this course", HttpStatus.NOT_FOUND);
    }
    return courseService.updateCourse(newCourse,id);
  }

  @DeleteMapping("/delete-course/{id}")
  public String deleteCourse(@PathVariable("id") UUID id, @RequestHeader("UserID") UUID userId) {
    Optional<User> user = userDetailsService.getUserById(userId);
    if(!user.isPresent()) {
      throw new ObjectNotFoundException("user","id");
    }
    Course course = courseService.getCourseById(id);
    if (course != null) {
      System.out.println(course.getCourseName());

      Set<Course> newCourseSet = user.get().getCourses().stream().filter(e->!e.getId().equals(course.getId())).collect(Collectors.toSet());
      user.get().setCourses(newCourseSet);
      for(Course e : newCourseSet) {
        System.out.println(e.getCourseName());
      }
      userRepository.save(user.get());

    }
    return "";
  }




}
