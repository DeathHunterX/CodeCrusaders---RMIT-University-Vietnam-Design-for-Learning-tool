package com.example.server.service;

import com.example.server.model.SharedCourseLink;

import java.util.Optional;
import java.util.UUID;

public interface SharedCourseLinkService {
  SharedCourseLink saveSharedCourseLink(SharedCourseLink sharedCourseLink);
  SharedCourseLink findSharedCourseLinkByShareLink(String shareLink);
  SharedCourseLink findSharedCourseLinkById(UUID linkId);
}
