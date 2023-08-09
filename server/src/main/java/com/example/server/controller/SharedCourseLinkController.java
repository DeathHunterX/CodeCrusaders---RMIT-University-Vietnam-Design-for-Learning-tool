package com.example.server.controller;

import com.example.server.api.response.ApiResponse;
import com.example.server.api.response.CourseDetailsResponse;
import com.example.server.model.Course;
import com.example.server.model.SharedCourseLink;
import com.example.server.model.User;
import com.example.server.service.CourseService;
import com.example.server.service.SharedCourseLinkService;
import com.example.server.service.impl.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("v1/api")
@RequiredArgsConstructor
public class SharedCourseLinkController {
  private final SharedCourseLinkService sharedCourseLinkService;
  private final CourseService courseService;
  private final UserDetailsServiceImpl userDetailsService;
  private final ModelMapper modelMapper;

  @PostMapping("/{course_id}/share")
  public ResponseEntity<SharedCourseLink> shareCourse(@PathVariable("course_id") UUID courseId) {
    Course course = courseService.getCourseById(courseId);
    String shareLink = course.generateShareLink();
    SharedCourseLink sharedCourseLink = new SharedCourseLink();
    sharedCourseLink.setShareLink(shareLink);
    sharedCourseLink.setUser(userDetailsService.getCurrentUser());
    sharedCourseLink.setCourse(course);
    sharedCourseLinkService.saveSharedCourseLink(sharedCourseLink);
    return new ResponseEntity<>(sharedCourseLink, HttpStatus.OK);
  }

  @GetMapping("/course/{share_link}")
  public ResponseEntity<?> getSharedCourse(@PathVariable("share_link") String shareLink) {
    SharedCourseLink sharedCourseLink = sharedCourseLinkService.findSharedCourseLinkByShareLink(shareLink);
    Course sharedCourse = sharedCourseLink.getCourse();
    User user = userDetailsService.getCurrentUser();
    CourseDetailsResponse courseDetailsResponse = modelMapper.map(sharedCourse, CourseDetailsResponse.class);
    System.out.println(courseDetailsResponse);
    if (userDetailsService.checkCourseOwnership(user,sharedCourse)) {
      return new ResponseEntity<>(courseDetailsResponse, HttpStatus.OK);
    }
    return new ResponseEntity<>("testing",HttpStatus.FORBIDDEN);
  }


//    return new ResponseEntity<>(new ApiResponse("No permission to view this course"), HttpStatus.FORBIDDEN);
//  }

}
