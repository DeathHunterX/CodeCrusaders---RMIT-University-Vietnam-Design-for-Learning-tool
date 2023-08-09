package com.example.server.service;

import com.example.server.model.SharedCourseLink;

import java.util.Optional;

public interface SharedCourseLinkService {
  SharedCourseLink saveSharedCourseLink(SharedCourseLink sharedCourseLink);
  SharedCourseLink findSharedCourseLinkByShareLink(String shareLink);
}
