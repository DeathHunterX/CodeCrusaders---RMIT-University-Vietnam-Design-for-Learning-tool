package com.example.server.service.impl;

import com.example.server.api.response.ApiResponse;
import com.example.server.api.response.ModuleDetailsResponse;
import com.example.server.api.response.PDFResponse;
import com.example.server.api.response.SharedLinkResponse;
import com.example.server.exception.ObjectNotFoundException;
import com.example.server.model.*;
import com.example.server.model.Module;
import com.example.server.repository.ModuleRepository;
import com.example.server.repository.SharedLinkRepository;
import com.example.server.service.CommentService;
import com.example.server.service.ModuleService;
import com.example.server.service.SharedCourseLinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SharedCourseLinkServiceImpl implements SharedCourseLinkService {
  private final SharedLinkRepository sharedLinkRepository;
  private final ModuleRepository moduleRepository;
  private final ModuleService moduleService;
  private final UserDetailsServiceImpl userDetailsService;
  @Override
  public SharedCourseLink saveShareLink(SharedCourseLink sharedCourseLink) {
    return sharedLinkRepository.save(sharedCourseLink);
  }

  @Override
  public SharedCourseLink findDetailsByShareLink(String shareLink) {
    return sharedLinkRepository.findByShareLink(shareLink).orElseThrow(()-> new ObjectNotFoundException("Share course link", "share link"));
  }

  @Override
  public SharedCourseLink findShareLinkById(UUID linkId) {
    return sharedLinkRepository.findById(linkId).orElseThrow(()-> new ObjectNotFoundException("link","id"));
  }

  @Override
  public SharedCourseLink generateLink(UUID moduleId) {
    Module module = moduleService.getModuleById(moduleId);
    String shareLink = module.generateShareLink();
    SharedCourseLink sharedCourseLink = new SharedCourseLink();
    sharedCourseLink.setShareLink(shareLink);
    sharedCourseLink.setUser(userDetailsService.getCurrentUser());
    sharedCourseLink.setModule(module);
    SharedCourseLink savedLink = saveShareLink(sharedCourseLink);
    module.setSharedCourseLinks(savedLink);
    moduleRepository.save(module);
    return savedLink;
  }

  @Override
  public ResponseEntity<?> getCourseModuleId(String shareLink) {
    User user = userDetailsService.getCurrentUser();
    SharedCourseLink sharedCourseLink = findDetailsByShareLink(shareLink);
    Module sharedModule = sharedCourseLink.getModule();
    Course sharedCourse = sharedModule.getCourse();
    Set<Course> courseSet = user.getCourses();
    if(!courseSet.stream().anyMatch(e->e.getId().equals(sharedCourse.getId()))) {
      return new ResponseEntity<>(new ApiResponse("You do not have permission to access this link"), HttpStatus.FORBIDDEN);
    }
    SharedLinkResponse sharedLinkResponse = SharedLinkResponse.builder()
        .courseId(sharedCourse.getId())
        .moduleId(sharedModule.getId())
        .build();
    return new ResponseEntity<>(sharedLinkResponse, HttpStatus.OK);
  }
}
