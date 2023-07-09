package com.example.server.service;

import com.example.server.api.response.ModuleNameResponse;
import com.example.server.model.Module;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface ModuleService {
  List<Module> getAllModules();

  List<ModuleNameResponse> getAllModuleNamesByCourseId(Long id);
  Optional<Module> getModuleById(Long id);

  Module createModule(Module module);
  void deleteModule(Long id);

  ResponseEntity<Module> updateModule(Module newAssignment, Long id);
}

