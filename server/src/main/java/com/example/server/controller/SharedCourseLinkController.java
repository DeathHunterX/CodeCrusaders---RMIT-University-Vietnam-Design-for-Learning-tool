package com.example.server.controller;

import com.example.server.api.response.ModuleDetailsResponse;
import com.example.server.api.response.PDFResponse;
import com.example.server.model.Comment;
import com.example.server.model.Course;
import com.example.server.model.Module;
import com.example.server.model.SharedCourseLink;
import com.example.server.service.ActivityService;
import com.example.server.service.CommentService;
import com.example.server.service.ModuleService;
import com.example.server.service.SharedCourseLinkService;
import com.example.server.service.impl.CommentServiceImpl;
import com.example.server.service.impl.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("v1/api")
@RequiredArgsConstructor
public class SharedCourseLinkController {
  private final SharedCourseLinkService sharedCourseLinkService;
  private final CommentService commentService;
  private final ModuleService moduleService;
  @PostMapping("/{module_id}/generateSharingID")
  public ResponseEntity<SharedCourseLink> shareCourse(@PathVariable("module_id") UUID moduleId) {
    return new ResponseEntity<>(sharedCourseLinkService.generateLink(moduleId), HttpStatus.OK);
  }

  @GetMapping("{share_link}")
  public ResponseEntity<?> getSharedCourse(@PathVariable("share_link") String shareLink) {
    SharedCourseLink sharedCourseLink = sharedCourseLinkService.findDetailsByShareLink(shareLink);
    Module sharedModule = sharedCourseLink.getModule();
    Course sharedCourse = sharedModule.getCourse();
    List<Comment> comments = commentService.getAllCommentsFromSharedLink(shareLink);
    ModuleDetailsResponse moduleDetailsResponse = ModuleDetailsResponse.builder()
        .name(sharedModule.getName())
        .los(sharedModule.getLos())
        .moduleWeek(sharedModule.getModuleWeek())
        .sessionList(moduleService.formatSessionList(sharedModule.getSessionList()))
        .shareLink(sharedCourseLink.getShareLink())
        .courseName(sharedCourse.getCourseName())
        .courseCode(sharedCourse.getCourseCode())
        .courseSemester(sharedCourse.getCourseSemester())
        .clos(sharedCourse.getClos())
        .assignmentList(sharedCourse.getAssignmentList())
        .build();
    PDFResponse pdfResponse = PDFResponse.builder()
        .moduleDetailsResponse(moduleDetailsResponse)
        .comments(comments.stream().toList())
        .build();
    return new ResponseEntity<>(pdfResponse, HttpStatus.OK);
  }

  @GetMapping("{share_link}/get-id")
  public ResponseEntity<?> getDataId(@PathVariable("share_link") String shareLink) {
    return sharedCourseLinkService.getCourseModuleId(shareLink);
  }
}
