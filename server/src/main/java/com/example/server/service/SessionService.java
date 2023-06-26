package com.example.server.service.impl;

import com.example.server.model.Assignment;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface SessionService {
  List<Assignment> getAllAssignments();
  Optional<Assignment> getAssignmentById(Long id);

  Assignment createAssignment(Assignment assignment);
  void deleteAssignment(Long id);

  ResponseEntity<Assignment> updateCourse(Assignment newAssignment, Long id);
}

