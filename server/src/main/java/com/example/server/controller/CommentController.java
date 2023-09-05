package com.example.server.controller;

import com.example.server.api.request.CommentRequest;
import com.example.server.api.response.ApiResponse;
import com.example.server.model.Course;
import com.example.server.model.User;
import com.example.server.service.CommentService;
import com.example.server.service.impl.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("v1/api")
@RequiredArgsConstructor
public class CommentController {
   private final CommentService commentService;
   private final UserDetailsServiceImpl userDetailsService;
  private final SimpMessagingTemplate simpMessagingTemplate;

  @GetMapping("links/{link_id}/comments")
  public ResponseEntity<?> getAllComments(@PathVariable("link_id") String linkId) {
    User user = userDetailsService.getCurrentUser();
    if (user == null) {
      return new ResponseEntity<>(new ApiResponse("You don't have permission to view comments"), HttpStatus.OK);
    }
    return new ResponseEntity<>(commentService.getAllCommentsFromSharedLink(linkId),HttpStatus.OK);
  }

  @PostMapping("links/{link_id}/comments")
  public ResponseEntity<?> createComment(@PathVariable("link_id") String id, @RequestBody CommentRequest commentRequest) {
    simpMessagingTemplate.convertAndSend("/topic/comments","update");
    return commentService.createComment(commentRequest, id);
  }

  @PutMapping("comments/{comment_id}")
  public ResponseEntity<?> updateComment(@PathVariable("comment_id") UUID id, @RequestBody CommentRequest commentRequest) {
    simpMessagingTemplate.convertAndSend("/topic/comments","update");
    return commentService.updateComment(id, commentRequest);
  }

  @DeleteMapping("comments/{comment_id}")
  public ResponseEntity<?> deleteComment(@PathVariable("comment_id") UUID id) {
    simpMessagingTemplate.convertAndSend("/topic/comments","update");
    return new ResponseEntity<>(commentService.deleteComment(id), HttpStatus.OK);
  }

}
