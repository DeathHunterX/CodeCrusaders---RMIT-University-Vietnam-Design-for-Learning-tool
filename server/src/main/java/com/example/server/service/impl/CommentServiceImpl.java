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

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
  private final CommentRepository commentRepository;
  private final SharedCourseLinkService sharedCourseLinkService;
  private final SharedLinkRepository sharedLinkRepository;
  private final UserDetailsServiceImpl userDetailsService;

  @Override
  public List<Comment> getAllCommentsFromSharedLink(UUID linkId) {
    SharedCourseLink sharedCourseLink = sharedCourseLinkService.findSharedCourseLinkById(linkId);
    return sharedCourseLink.getCommentList();
  }

  @Override
  public Comment getCommentById(UUID id) {
    return commentRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Comment", "id"));
  }

  @Override
  @Transactional
  public ResponseEntity<?> createComment(CommentRequest commentRequest, UUID linkId) {
    var user = userDetailsService.getCurrentUser();
    if (user == null) {
      return new ResponseEntity<>(new ApiResponse("You don't have permission to view/modify this course!"), HttpStatus.OK);
    }
    SharedCourseLink sharedCourseLink = sharedCourseLinkService.findSharedCourseLinkById(linkId);
    Comment comment = new Comment();
    comment.setContent(commentRequest.getContent());
    comment.setUser(user);
    comment.setShareLink(sharedCourseLink);
    sharedCourseLink.getCommentList().add(comment);
    sharedLinkRepository.save(sharedCourseLink);
    return new ResponseEntity<>(commentRepository.save(comment), HttpStatus.OK);
  }

  @Override
  @Transactional
  public ResponseEntity<?> replyComment(CommentRequest commentRequest, UUID commentId, UUID linkId) {
    var user = userDetailsService.getCurrentUser();
    if (user == null) {
      return new ResponseEntity<>(new ApiResponse("You don't have permission to view/modify this course!"), HttpStatus.OK);
    }
    SharedCourseLink sharedCourseLink = sharedCourseLinkService.findSharedCourseLinkById(linkId);
    Comment targetComment = getCommentById(commentId);
    Comment replyComment = new Comment();
    replyComment.setUser(user);
    replyComment.setContent(commentRequest.getContent());
    replyComment.setReplyTo(targetComment);
    replyComment.setShareLink(sharedCourseLink);
    targetComment.getReplies().add(replyComment);
    commentRepository.save(targetComment);
    return new ResponseEntity<>(commentRepository.save(replyComment), HttpStatus.OK);
  }
}
