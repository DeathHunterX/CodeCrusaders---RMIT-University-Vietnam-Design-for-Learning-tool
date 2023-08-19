package com.example.server.controller;

import com.example.server.api.request.CommentRequest;
import com.example.server.api.response.ApiResponse;
import com.example.server.model.Course;
import com.example.server.model.User;
import com.example.server.service.CommentService;
import com.example.server.service.impl.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("v1/api")
@RequiredArgsConstructor
public class CommentController {
   private final CommentService commentService;
   private final UserDetailsServiceImpl userDetailsService;

  @GetMapping("comments")
  public ResponseEntity<?> getAllComments() {
    User user = userDetailsService.getCurrentUser();
    if (user == null) {
      return new ResponseEntity<>(new ApiResponse("You don't have permission to view comments"), HttpStatus.OK);
    }
    return new ResponseEntity<>(commentService.getAllComments(),HttpStatus.OK);
  }


  @GetMapping("comments/{id}")
  public ResponseEntity<?> getCourseById(@PathVariable("id") UUID id) {
    return new ResponseEntity<>(commentService.getCommentById(id), HttpStatus.OK);
  }

  @PostMapping("courses/{share_link}/comments/create")
  public ResponseEntity<?> getAllModulesByCourseId(@PathVariable("share_link") UUID linkId, @RequestBody CommentRequest commentRequest) {
    return new ResponseEntity<>(commentService.createComment(commentRequest, linkId), HttpStatus.OK);
  }
}
