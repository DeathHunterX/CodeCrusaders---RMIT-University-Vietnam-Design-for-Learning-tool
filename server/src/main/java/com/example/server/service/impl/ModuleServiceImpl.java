package com.example.server.service.impl;

import com.example.server.api.request.ModuleCreateRequest;
import com.example.server.api.response.ModuleDetailsResponse;
import com.example.server.api.response.ModuleNameResponse;
import com.example.server.api.response.SessionDetailsResponse;
import com.example.server.exception.ObjectNotFoundException;
import com.example.server.model.Course;
import com.example.server.model.Module;
import com.example.server.model.Session;
import com.example.server.model.enums.GroupingType;
import com.example.server.model.enums.SessionOption;
import com.example.server.model.enums.SessionType;
import com.example.server.repository.CourseRepository;
import com.example.server.repository.ModuleRepository;
import com.example.server.repository.SessionRepository;
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
  private final SessionRepository sessionRepository;
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
  public ModuleDetailsResponse getModuleDetailsById(UUID id) {
    Module module = moduleRepository.findById(id)
            .orElseThrow(()->new ObjectNotFoundException("Module", "id",404));
    List<Session> sessionList = module.getSessionList();
    List<SessionDetailsResponse> sessionDetailsResponses = sessionList.stream()
            .map(e->new SessionDetailsResponse(e.getSessionType(),e.getGroupingType(),e.getSessionOption(),e.getHasLecturer()))
            .collect(Collectors.toList());
    ModuleDetailsResponse moduleDetailsResponse = new ModuleDetailsResponse(module.getName(),module.getLos(),sessionDetailsResponses);
    return moduleDetailsResponse;
  }

  @Override
  public ResponseEntity<?> createModule(UUID courseId, ModuleCreateRequest moduleCreateRequest) {
    Course course = courseRepository.findById(courseId)
            .orElseThrow(()->new ObjectNotFoundException("Course","id"));
    Session preClass = new Session(SessionType.PRE_CLASS);
    Session inClass = new Session(SessionType.IN_CLASS);
    Session postClass = new Session(SessionType.POST_CLASS);
    List<Session> sessionList = new ArrayList<>();
    sessionList.addAll(List.of(preClass,inClass,postClass));
    Module module = new Module(moduleCreateRequest.getModuleName(), sessionList);
    sessionList.stream().forEach(e->e.setModule(module));
    module.setCourse(course);
    return new ResponseEntity<>(moduleRepository.save(module),HttpStatus.OK);
  }

  @Override
  public void deleteModule(UUID id) {
    Module module = moduleRepository.findById(id)
                    .orElseThrow(()->new ObjectNotFoundException("Module","id"));
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
