package com.example.server.service.impl;

import com.example.server.api.request.CourseRequest;
import com.example.server.api.request.CourseUpdateRequest;
import com.example.server.api.response.CourseResponse;
import com.example.server.exception.ObjectNotFoundException;
import com.example.server.model.Activity;
import com.example.server.model.Assignment;
import com.example.server.model.Course;
import com.example.server.model.User;
import com.example.server.repository.AssignmentRepository;
import com.example.server.repository.CourseRepository;
import com.example.server.repository.UserRepository;
import com.example.server.service.AssignmentService;
import com.example.server.service.CourseService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final AssignmentRepository assignmentRepository;
    private final UserDetailsServiceImpl userDetailsService;
    private final ModelMapper modelMapper;
    private final AssignmentService assignmentService;

    @Override
    public List<CourseResponse> getAllCoursesByUsername(String username) {
        User user = userRepository.findByUsername(username);
        List<CourseResponse> courseResponses = user.getCourses().stream().map(e -> modelMapper.map(e, CourseResponse.class)).collect(Collectors.toList());
        return courseResponses;
    }

    @Override
    public Course getCourseById(UUID id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Course", "id"));
    }

    @Override
    public Course createCourse(CourseRequest courseRequest, User _user) {
        Course course = modelMapper.map(courseRequest, Course.class);
        course.setUserSet(new HashSet<>());
        List<Assignment> assignmentList = course.getAssignmentList();
        assignmentList.stream().forEach(e -> e.setCourse(course));
        Set<User> userSet = course.getUserSet();
        userSet.add(_user);
        courseRepository.save(course);
        Set<Course> courses = _user.getCourses();
        courses.add(course);
        userRepository.save(_user);
        return course;
    }

    @Override
    public void deleteCourse(UUID id) {
        courseRepository.deleteById(id);
    }

    @Override
    public void removeActivityFromCouse(Course course, Activity activity) {
        course.getActivityList().remove(activity);
        activity.setCourse(null);
        courseRepository.save(course);
    }

    @Override
    public void addActivityToCourse(Course course, Activity activity) {
        activity.setCourse(course);
        course.getActivityList().add(activity);
    }

    @Override
    @Transactional
    public ResponseEntity<Course> updateCourse(CourseUpdateRequest courseUpdateRequest, UUID id) {
        var _course = courseRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Course", "id"));
        _course.setCourseCode(courseUpdateRequest.getCourseCode());
        _course.setCourseSemester(courseUpdateRequest.getCourseSemester());
        _course.setClos(courseUpdateRequest.getClos());
        _course.setAssignmentList(courseUpdateRequest.getAssignmentList());
        Course savedCourse = courseRepository.save(_course);
        return new ResponseEntity<>(savedCourse, HttpStatus.OK);
    }

}
