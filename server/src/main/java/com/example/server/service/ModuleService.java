package com.example.server.service;

import com.example.server.api.request.ModuleCreateRequest;
import com.example.server.api.request.ModuleRequest;
import com.example.server.api.response.ApiResponse;
import com.example.server.api.response.ModuleDetailsResponse;
import com.example.server.api.response.ModuleNameResponse;
import com.example.server.model.Module;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

public interface ModuleService {
  ModuleDetailsResponse getModuleDetailsById(UUID id);

  Module getModuleById(UUID id);

  ResponseEntity<?> createModule(UUID courseID, ModuleCreateRequest moduleCreateRequest);
  ResponseEntity<?> deleteModule(UUID courseId, UUID moduleId);

  ResponseEntity<Module> updateModule(ModuleRequest moduleRequest, UUID id);
}

