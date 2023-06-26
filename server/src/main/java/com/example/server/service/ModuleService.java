package com.example.server.service.impl;

import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface ModuleService {
  List<Module> getAllAssignments();
  Optional<Module> getAssignmentById(Long id);

  Module createAssignment(Module assignment);
  void deleteAssignment(Long id);

  ResponseEntity<Module> updateCourse(Module newAssignment, Long id);
}

