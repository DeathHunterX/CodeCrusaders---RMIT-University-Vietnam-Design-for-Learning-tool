package com.example.server.service.impl;

import com.example.server.api.request.CourseRequest;
import com.example.server.api.response.CourseResponse;
import com.example.server.exception.ObjectNotFoundException;
import com.example.server.model.Assignment;
import com.example.server.model.Course;
import com.example.server.model.User;
import com.example.server.repository.CourseRepository;
import com.example.server.repository.UserRepository;
import com.example.server.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {
  private final CourseRepository courseRepository;
  private final UserRepository userRepository;
  private final UserDetailsServiceImpl userDetailsService;
  private final ModelMapper modelMapper;
  @Override
  public List<CourseResponse> getAllCourses() {
    List<CourseResponse> courseResponses = courseRepository.findAll().stream().map(course -> modelMapper.map(course, CourseResponse.class)).toList();
    return courseResponses;
  }

  @Override
  public Course getCourseById(UUID id) {
    return courseRepository.findById(id)
            .orElseThrow(()-> new ObjectNotFoundException("Course", "id"));
  }

  @Override
  public Course createCourse(CourseRequest courseRequest) {
    Optional<User> user = userDetailsService.getUserById(courseRequest.getUserID());
    if(!user.isPresent()) {
      throw new ObjectNotFoundException("user","id");
    }
    Course course = modelMapper.map(courseRequest, Course.class);
    course.setUserSet(new HashSet<>());
    List<Assignment> assignmentList = course.getAssignmentList();
    assignmentList.stream().forEach(e->e.setCourse(course));
    User _user = user.get();
    Set<User> userSet = course.getUserSet();
    userSet.add(_user);
    courseRepository.save(course);
    Set<Course> courses = _user.getCourses();
    courses.add(course);
    userRepository.save(_user);
    return course ;
  }

  @Override
  public void deleteCourse(UUID id) {
   courseRepository.deleteById(id);
  }

  @Override
  public ResponseEntity<Course> updateCourse(Course newCourse, UUID id) {
    Optional<Course> courseData = courseRepository.findById(id);
    if (courseData.isPresent()) {
      Course _course = courseData.get();
      _course.setCourseName(newCourse.getCourseName());
      _course.setCourseCode(newCourse.getCourseCode());
      _course.setCourseSemester(newCourse.getCourseSemester());
      _course.setClos(newCourse.getClos());
      _course.setAssignmentList(newCourse.getAssignmentList());
      return new ResponseEntity<>(courseRepository.save(_course), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}
