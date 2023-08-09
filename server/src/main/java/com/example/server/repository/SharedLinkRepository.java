package com.example.server.repository;

import com.example.server.model.SharedCourseLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SharedLinkRepository extends JpaRepository<SharedCourseLink, UUID> {
  Optional<SharedCourseLink> findByShareLink(String shareLink);
}
