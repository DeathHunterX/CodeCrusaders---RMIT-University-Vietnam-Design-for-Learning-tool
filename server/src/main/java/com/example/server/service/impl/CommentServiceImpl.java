package com.example.server.service.impl;

import com.example.server.api.request.CommentRequest;
import com.example.server.api.response.ApiResponse;
import com.example.server.exception.ObjectNotFoundException;
import com.example.server.model.Comment;
import com.example.server.model.SharedCourseLink;
import com.example.server.repository.CommentRepository;
import com.example.server.repository.SharedLinkRepository;
import com.example.server.service.CommentService;
import com.example.server.service.SharedCourseLinkService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

import static com.example.server.utils.FormatDateTimeUtils.getIsoDateTime;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
  private final CommentRepository commentRepository;
  private final SharedCourseLinkService sharedCourseLinkService;
  private final UserDetailsServiceImpl userDetailsService;

  @Override
  public List<Comment> getAllCommentsFromSharedLink(String link) {
    SharedCourseLink sharedCourseLink = sharedCourseLinkService.findDetailsByShareLink(link);
    List<Comment> comments = sharedCourseLink.getCommentList();
    return comments;
  }

  @Override
  public Comment getCommentById(UUID id) {
    return commentRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Comment", "id"));
  }

  @Override
  public ResponseEntity<?> createComment(CommentRequest commentRequest, String linkId) {
    var user = userDetailsService.getCurrentUser();
    if (user == null) {
      return new ResponseEntity<>(new ApiResponse("You don't have permission to view/modify this course!"), HttpStatus.OK);
    }
    SharedCourseLink sharedCourseLink = sharedCourseLinkService.findDetailsByShareLink(linkId);
    Comment newComment = new Comment();
    newComment.setContent(commentRequest.getContent());
    newComment.setUser(user);
    newComment.setShareLink(sharedCourseLink);
    newComment.setDateTime(getIsoDateTime(LocalDateTime.now()));
    sharedCourseLink.getCommentList().add(newComment);
    commentRepository.save(newComment);
    return new ResponseEntity<>(newComment, HttpStatus.OK);
  }

  @Override
  @Transactional
  public ResponseEntity<?> updateComment(UUID commentId, CommentRequest commentRequest) {
    Comment comment = getCommentById(commentId);
    comment.setContent(commentRequest.getContent());
    Comment updatedComment = commentRepository.save(comment);
    return new ResponseEntity<>(updatedComment, HttpStatus.OK);
  }

  @Override
  public ApiResponse deleteComment(UUID commentId) {
    Comment comment = getCommentById(commentId);
    comment.setShareLink(null);
    commentRepository.save(comment);
    return new ApiResponse("Successfully delete a comment");
  }
}
