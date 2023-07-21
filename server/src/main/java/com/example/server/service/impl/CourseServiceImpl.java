package com.example.server.service.impl;

import com.example.server.api.request.CourseRequest;
import com.example.server.api.response.CourseResponse;
import com.example.server.exception.ObjectNotFoundException;
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
    public List<CourseResponse> getAllCourses() {
        List<CourseResponse> courseResponses = courseRepository.findAll().stream().map(course -> modelMapper.map(course, CourseResponse.class)).toList();
        return courseResponses;
    }

    @Override
    public List<CourseResponse> getAllCoursesByUsername(String username) {
        User user = userRepository.findByUsername(username);
        List<CourseResponse> courseResponses = user.getCourses().stream().map(e -> modelMapper.map(e, CourseResponse.class)).collect(Collectors.toList());
        return courseResponses;
    }

    @Override
    public Course getCourseById(UUID id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Course", "id", 404));
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
    public ResponseEntity<Course> updateCourse(Course newCourse, UUID id) {
        Course _course = courseRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Course", "id"));
        _course.setCourseName(newCourse.getCourseName());
        _course.setCourseCode(newCourse.getCourseCode());
        _course.setCourseSemester(newCourse.getCourseSemester());
        _course.setClos(newCourse.getClos());
//        List<Assignment> oldAssignmentList = _course.getAssignmentList();
        List<Assignment> newAssignmentList = newCourse.getAssignmentList();
//        Map<UUID, Assignment> oldAssignmentMap = new HashMap<>();
//        for (Assignment assignment : oldAssignmentList) {
//            oldAssignmentMap.put(assignment.getId(), assignment);
//        }
//        if(newAssignmentList.size()>0) {
//            for (Assignment newAssignmentItem : newAssignmentList) {
//                Assignment oldAssignmentItem = oldAssignmentMap.get(newAssignmentItem.getId());
//                if (oldAssignmentItem != null) {
//                    assignmentService.updateAssignment(newAssignmentItem, oldAssignmentItem.getId());
//                }
//            }
//        }
        System.out.println(newAssignmentList);
        _course.getAssignmentList().clear();
        _course.getAssignmentList().addAll(newAssignmentList);
//        _course.setAssignmentList(newAssignmentList);
        Course savedCourse = courseRepository.save(_course);

//        System.out.println(newAssignmentList.size());
        return new ResponseEntity<>(savedCourse, HttpStatus.OK);
    }
}
