package com.example.server.service;

import com.example.server.api.request.ModuleCreateRequest;
import com.example.server.api.request.ModuleRequest;
import com.example.server.api.response.ModuleDetailsResponse;
import com.example.server.api.response.ModuleNameResponse;
import com.example.server.model.Module;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ModuleService {
  List<Module> getAllModules();

  List<ModuleNameResponse> getAllModuleNamesByCourseId(UUID id);
  ModuleDetailsResponse getModuleDetailsById(UUID id);

  ResponseEntity<?> createModule(UUID courseID, ModuleCreateRequest moduleCreateRequest);
  void deleteModule(UUID id);

  ResponseEntity<Module> updateModule(ModuleRequest moduleRequest, UUID id);
}

