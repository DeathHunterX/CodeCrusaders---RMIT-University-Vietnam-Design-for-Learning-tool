package com.example.server.service.impl;

import com.example.server.model.Assignment;
import com.example.server.model.Course;
import com.example.server.repository.AssignmentRepository;
import com.example.server.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssignmentServiceImpl implements AssignmentService {
  @Autowired
  private AssignmentRepository assignmentRepository;
  @Override
  public List<Assignment> getAllAssignments() {
    return assignmentRepository.findAll();
  }

  @Override
  public Optional<Assignment> getAssignmentById(Long id) {
    return assignmentRepository.findById(id);
  }

  @Override
  public Assignment createAssignment(Assignment assignment) {
    return assignmentRepository.save(assignment);
  }

  @Override
  public void deleteAssignment(Long id) {
    assignmentRepository.deleteById(id);
  }

  @Override
  public ResponseEntity<Assignment> updateCourse(Assignment newAssignment, Long id) {
    Optional<Assignment> assignmentData = assignmentRepository.findById(id);
    if (assignmentData.isPresent()) {
      Assignment _assignment = assignmentData.get();
      _assignment.setDescription(newAssignment.getDescription());
      _assignment.setName(newAssignment.getName());
      return new ResponseEntity<>(assignmentRepository.save(_assignment), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}
