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

import java.util.*;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
  private final CommentRepository commentRepository;
  private final SharedCourseLinkService sharedCourseLinkService;
  private final SharedLinkRepository sharedLinkRepository;
  private final UserDetailsServiceImpl userDetailsService;

  @Override
  public List<Comment> getAllCommentsFromSharedLink(String link) {
    SharedCourseLink sharedCourseLink = sharedCourseLinkService.findDetailsByShareLink(link);
    List<Comment> comments = sharedCourseLink.getCommentList();
    List<Comment> rootComments = new ArrayList<>();
    Map<UUID, Comment> commentMap = new HashMap<>();
    for (Comment comment : comments) {
      commentMap.put(comment.getId(), comment);
    }
    for (Comment comment : comments) {
      Comment replyTo = comment.getReplyTo();
      if (replyTo == null) {
        rootComments.add(comment);
      } else {
        Comment parent = commentMap.get(replyTo.getId());
        parent.getReplies().add(comment);
      }
    }
    return rootComments;
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
    Comment targetComment = null;
    if (!(commentRequest.getReplyToId() == null)) {
      targetComment = getCommentById(commentRequest.getReplyToId());
    }

    Comment newComment = new Comment();
    newComment.setContent(commentRequest.getContent());
    newComment.setUser(user);
    newComment.setShareLink(sharedCourseLink);

    if (targetComment != null) {
      Comment replyComment = new Comment();
      replyComment.setContent(newComment.getContent());
      replyComment.setUser(newComment.getUser());
      replyComment.setShareLink(newComment.getShareLink());
      replyComment.setReplyTo(targetComment);

      Comment savedReplyComment = commentRepository.save(replyComment);
      targetComment.getReplies().add(savedReplyComment);
      commentRepository.save(targetComment);
      return new ResponseEntity<>(savedReplyComment, HttpStatus.OK);
    } else {
      sharedCourseLink.getCommentList().add(newComment);
      commentRepository.save(newComment);
      return new ResponseEntity<>(newComment, HttpStatus.OK);
    }
  }

  @Override
  @Transactional
  public ResponseEntity<?> updateComment(UUID commentId, CommentRequest commentRequest) {
    Comment comment = getCommentById(commentId);
    comment.setContent(commentRequest.getContent());
    Comment updatedComment = commentRepository.save(comment);
    return new ResponseEntity<>(updatedComment, HttpStatus.OK);
  }
}
