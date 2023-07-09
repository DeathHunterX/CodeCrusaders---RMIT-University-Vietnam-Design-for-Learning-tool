package com.example.server.service.impl;

import com.example.server.api.request.CourseRequest;
import com.example.server.api.response.CourseResponse;
import com.example.server.model.Assignment;
import com.example.server.model.Course;
import com.example.server.repository.CourseRepository;
import com.example.server.service.CourseService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {
  private final CourseRepository courseRepository;
  private final ModelMapper modelMapper;
  @Override
  public List<CourseResponse> getAllCourses() {
    List<CourseResponse> courseResponses = courseRepository.findAll().stream().map(course -> modelMapper.map(course, CourseResponse.class)).toList();
    return courseResponses;
  }

  @Override
  public Optional<Course> getCourseById(Long id) {
    return courseRepository.findById(id);
  }

  @Override
  public Course createCourse(CourseRequest courseRequest) {
    Course course = modelMapper.map(courseRequest, Course.class);
    List<Assignment> assignmentList = course.getAssignmentList();
    assignmentList.stream().forEach(e->e.setCourse(course));
    return courseRepository.save(course);
  }

  @Override
  public void deleteCourse(Long id) {
   courseRepository.deleteById(id);
  }

  @Override
  public ResponseEntity<Course> updateCourse(Course newCourse, Long id) {
    Optional<Course> courseData = courseRepository.findById(id);
    if (courseData.isPresent()) {
      Course _course = courseData.get();
      _course.setCourseName(newCourse.getCourseName());
      _course.setCourseCode(newCourse.getCourseCode());
      _course.setSemester(newCourse.getSemester());
      _course.setClos(newCourse.getClos());
      _course.setAssignmentList(newCourse.getAssignmentList());
      return new ResponseEntity<>(courseRepository.save(_course), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}
