package com.example.server.controller;

import com.example.server.api.response.CourseDetailsReponse;
import com.example.server.api.response.ModuleDetailsResponse;
import com.example.server.api.response.PDFResponse;
import com.example.server.model.Comment;
import com.example.server.model.Course;
import com.example.server.model.Module;
import com.example.server.model.SharedCourseLink;
import com.example.server.service.CommentService;
import com.example.server.service.ModuleService;
import com.example.server.service.SharedCourseLinkService;
import com.example.server.service.impl.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("v1/api")
@RequiredArgsConstructor
public class SharedCourseLinkController {
  private final SharedCourseLinkService sharedCourseLinkService;
  private final ModuleService moduleService;
  private final UserDetailsServiceImpl userDetailsService;
  private final ModelMapper modelMapper;
  private final CommentService commentService;

  @PostMapping("/{module_id}/generateSharingID")
  public ResponseEntity<SharedCourseLink> shareCourse(@PathVariable("module_id") UUID moduleId) {
    Module module = moduleService.getModuleById(moduleId);
    String shareLink = module.generateShareLink();
    SharedCourseLink sharedCourseLink = new SharedCourseLink();
    sharedCourseLink.setShareLink(shareLink);
    sharedCourseLink.setUser(userDetailsService.getCurrentUser());
    sharedCourseLink.setModule(module);
    return new ResponseEntity<>(sharedCourseLinkService.saveShareLink(sharedCourseLink), HttpStatus.OK);
  }

  @GetMapping("{share_link}")
  public ResponseEntity<?> getSharedCourse(@PathVariable("share_link") String shareLink) {
    SharedCourseLink sharedCourseLink = sharedCourseLinkService.findDetailsByShareLink(shareLink);
    Module sharedModule = sharedCourseLink.getModule();
    Course sharedCourse = sharedModule.getCourse();
    List<Comment> comments = commentService.getAllCommentsFromSharedLink(shareLink);
//    User user = userDetailsService.getCurrentUser();
    CourseDetailsReponse courseDetailsReponse = modelMapper.map(sharedCourse, CourseDetailsReponse.class);
    ModuleDetailsResponse moduleDetailsResponse = modelMapper.map(sharedModule, ModuleDetailsResponse.class);
    System.out.println(courseDetailsReponse);
    System.out.println(moduleDetailsResponse);
    PDFResponse pdfResponse = PDFResponse.builder()
        .moduleDetailsResponse(moduleDetailsResponse)
        .courseDetailsReponse(courseDetailsReponse)
        .comments(comments)
        .build();
    return new ResponseEntity<>(pdfResponse,HttpStatus.OK);

    //This is test permission to view course via link, will improve this later
//    if (userDetailsService.checkCourseOwnership(user,sharedCourse)) {
//      return new ResponseEntity<>(courseDetailsResponse, HttpStatus.OK);
//    }
//    return new ResponseEntity<>("You have no permission to view this module info!",HttpStatus.FORBIDDEN);
  }


//    return new ResponseEntity<>(new ApiResponse("No permission to view this course"), HttpStatus.FORBIDDEN);
//  }

}
