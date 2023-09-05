package com.example.server.repository;

import com.example.server.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CommentRepository extends JpaRepository<Comment, UUID> {
  List<Comment> findByShareLink_ShareLinkOrderByDateTime(String link);
}
