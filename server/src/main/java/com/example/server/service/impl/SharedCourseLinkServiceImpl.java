package com.example.server.service.impl;

import com.example.server.exception.ObjectNotFoundException;
import com.example.server.model.SharedCourseLink;
import com.example.server.repository.SharedLinkRepository;
import com.example.server.service.SharedCourseLinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SharedCourseLinkServiceImpl implements SharedCourseLinkService {
  private final SharedLinkRepository sharedLinkRepository;
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
}
