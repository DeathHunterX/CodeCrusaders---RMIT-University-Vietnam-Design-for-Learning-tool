package com.example.server.controller;

//import com.example.server.api.response.CourseResponse;
import com.example.server.api.request.CourseRequest;
import com.example.server.api.response.ApiResponse;
import com.example.server.api.response.CourseResponse;
import com.example.server.exception.ObjectNotFoundException;
import com.example.server.model.Course;
import com.example.server.model.CustomUserDetails;
import com.example.server.model.User;
import com.example.server.repository.CourseRepository;
import com.example.server.repository.UserRepository;
import com.example.server.service.CourseService;
import com.example.server.service.impl.UserDetailsServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
  public ResponseEntity<?> getAllCourses() {
    UserDetails userDetails = getCurrentUser();
    if(userDetails == null) {
      return new ResponseEntity<>(new ApiResponse("You have no courses"),HttpStatus.OK);
    }
      return new ResponseEntity<>(courseService.getAllCoursesByUsername(userDetails.getUsername()),HttpStatus.OK);
  }

  private UserDetails getCurrentUser() {
    SecurityContext securityContext = SecurityContextHolder.getContext();
    Authentication authentication = securityContext.getAuthentication();
    System.out.println(authentication);
    if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof CustomUserDetails) {
      CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
      return userDetails;
    }
    return null;
  }
  @GetMapping("courses/{id}")
  public ResponseEntity<?> getCourseById( @PathVariable("id") UUID id) {
    UserDetails userDetails = getCurrentUser();
    if(userDetails == null) {
      return new ResponseEntity<>(new ApiResponse("You do not have this course!"),HttpStatus.OK);
    }
    return new ResponseEntity<>(courseService.getCourseById(id),HttpStatus.OK);
  }

  @GetMapping("courses/{course_id}/modules")
  public ResponseEntity<?> getAllModulesByCourseId(@PathVariable UUID course_id) {
    Course course = courseService.getCourseById(course_id);
    return new ResponseEntity<>(course.getModuleList(),HttpStatus.OK);
  }
  @PostMapping("/create-course")
  public ResponseEntity<?> createCourse(@RequestBody CourseRequest courseRequest) {
    UserDetails userDetails = getCurrentUser();
    if(userDetails == null) {
      return new ResponseEntity<>(new ApiResponse("You cannot create a course!"),HttpStatus.OK);
    }
    CustomUserDetails customUserDetails = userDetailsService.loadUserByUsername(userDetails.getUsername());
    User user = customUserDetails.getUser();

    return ResponseEntity.ok(courseService.createCourse(courseRequest,user));
  }

  @PutMapping("/update-course/{id}")
  public ResponseEntity<?> updateCourse(@PathVariable("id") UUID id, @RequestBody Course newCourse) {
    return courseService.updateCourse(newCourse,id);
  }

  @DeleteMapping("/delete-course/{id}")
  public ResponseEntity<?> deleteCourse(@PathVariable("id") UUID id) {
    UserDetails userDetails = getCurrentUser();
    if(userDetails == null) {
      return new ResponseEntity<>(new ApiResponse("You cannot delete this course!"),HttpStatus.OK);
    }
    CustomUserDetails customUserDetails = userDetailsService.loadUserByUsername(userDetails.getUsername());
    User user = customUserDetails.getUser();
    Course course = courseService.getCourseById(id);
    if (course != null) {
      System.out.println(course.getCourseName());
      Set<Course> newCourseSet = user.getCourses().stream().filter(e->!e.getId().equals(course.getId())).collect(Collectors.toSet());
      user.setCourses(newCourseSet);
//      for(Course e : newCourseSet) {
//        System.out.println(e.getCourseName());
//      }
      userRepository.save(user);
    }
    return new ResponseEntity<>(new ApiResponse("Successfully delete course"),HttpStatus.OK);
  }




}
