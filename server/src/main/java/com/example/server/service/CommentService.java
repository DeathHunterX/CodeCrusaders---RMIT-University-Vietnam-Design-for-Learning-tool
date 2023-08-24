package com.example.server.service;

import com.example.server.api.request.ActivityRequest;
import com.example.server.api.request.CommentRequest;
import com.example.server.model.Activity;
import com.example.server.model.Comment;
import com.example.server.model.Course;
import com.example.server.model.Session;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

public interface CommentService {
  List<Comment> getAllCommentsFromSharedLink(String link);
  Comment getCommentById(UUID id);
  ResponseEntity<?> createComment(CommentRequest commentRequest, String link);

  ResponseEntity<?> updateComment(UUID commentId, CommentRequest commentRequest);
}