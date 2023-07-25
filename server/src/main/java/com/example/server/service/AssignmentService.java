package com.example.server.service;

import com.example.server.api.request.AssignmentRequest;
import com.example.server.model.Assignment;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AssignmentService {
  List<Assignment> getAllAssignments();
  Optional<Assignment> getAssignmentById(UUID id);

  Assignment createAssignment(Assignment assignment);
  void deleteAssignment(UUID id);

  void updateAssignmentByAssignmentNumber(List<AssignmentRequest> assignmentRequestList, List<Assignment> oldAsignmentList, int assignmentNo);
}

