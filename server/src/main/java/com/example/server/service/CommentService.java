package com.example.server.service;

import com.example.server.api.request.CommentRequest;
import com.example.server.model.Comment;
import org.springframework.http.ResponseEntity;

import java.util.Set;
import java.util.UUID;

public interface CommentService {
  Set<Comment> getAllCommentsFromSharedLink(String link);
  Comment getCommentById(UUID id);
  ResponseEntity<?> createComment(CommentRequest commentRequest, String link);

  ResponseEntity<?> updateComment(UUID commentId, CommentRequest commentRequest);
}
