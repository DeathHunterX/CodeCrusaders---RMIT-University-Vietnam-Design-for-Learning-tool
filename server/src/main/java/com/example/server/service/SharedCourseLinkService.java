package com.example.server.service;

import com.example.server.model.SharedCourseLink;

import java.util.Optional;
import java.util.UUID;

public interface SharedCourseLinkService {
  SharedCourseLink saveShareLink(SharedCourseLink sharedCourseLink);
  SharedCourseLink findDetailsByShareLink(String shareLink);
  SharedCourseLink findShareLinkById(UUID linkId);

  SharedCourseLink generateLink(UUID moduleId);
}
