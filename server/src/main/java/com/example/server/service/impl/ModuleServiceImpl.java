package com.example.server.service.impl;

import com.example.server.api.request.ModuleCreateRequest;
import com.example.server.api.response.ModuleDetailsResponse;
import com.example.server.api.response.ModuleNameResponse;
import com.example.server.api.response.SessionDetailsResponse;
import com.example.server.exception.ObjectNotFoundException;
import com.example.server.model.Course;
import com.example.server.model.Module;
import com.example.server.model.Session;
import com.example.server.repository.CourseRepository;
import com.example.server.repository.ModuleRepository;
import com.example.server.service.ModuleService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModuleServiceImpl implements ModuleService {

  private final ModuleRepository moduleRepository;
  private final CourseRepository courseRepository;
  private final ModelMapper modelMapper;
  @Override
  @Transactional
  public List<Module> getAllModules() {
    return moduleRepository.findAll();
  }

  @Override
  public List<ModuleNameResponse> getAllModuleNamesByCourseId(UUID id) {
    Optional<Course> courseOptional = courseRepository.findById(id);
    if (!courseOptional.isPresent()) {
      return new ArrayList<>();
    }
    Course course = courseOptional.get();
    List<Module> moduleList = course.getModuleList();
    return new ArrayList<>();
  }

  @Override
  public ResponseEntity<ModuleDetailsResponse> getModuleDetailsById(UUID id) {
    Optional<Module> module = moduleRepository.findById(id);
    if(!module.isPresent()) {
      return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
    }
    Module _module = module.get();
    List<Session> sessionList = _module.getSessionList();
    List<SessionDetailsResponse> sessionDetailsResponses = sessionList.stream().map(e->new SessionDetailsResponse(e.getSessionType(),e.getGroupingType(),e.getSessionOption(),e.getHasLecturer())).collect(Collectors.toList());
    ModuleDetailsResponse moduleDetailsResponse = new ModuleDetailsResponse(_module.getName(),_module.getLos(),sessionDetailsResponses);
    return new ResponseEntity<>(moduleDetailsResponse,HttpStatus.OK);
  }

  @Override
  public ResponseEntity<?> createModule(UUID courseId, ModuleCreateRequest moduleCreateRequest) {
    Optional<Course> course = courseRepository.findById(courseId);
    if(!course.isPresent()) {
      return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
    }
    Course _course = course.get();
    Module module = new Module(moduleCreateRequest.getModuleName());
    module.setCourse(_course);
    return new ResponseEntity<>(moduleRepository.save(module),HttpStatus.NO_CONTENT);
  }

  @Override
  public void deleteModule(UUID id) {
    moduleRepository.deleteById(id);
  }

  @Override
  public ResponseEntity<Module> updateModule(Module moduleInfo, UUID id) {
    Optional<Module> moduleData = moduleRepository.findById(id);
    if (moduleData.isPresent()) {
      Module _module = moduleData.get();
      _module.setName(moduleInfo.getName());
      _module.setLos(moduleInfo.getLos());
      _module.setSessionList(moduleInfo.getSessionList());
      return new ResponseEntity<>(moduleRepository.save(_module), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}
