package com.example.server.service.impl;

import com.example.server.api.response.ModuleNameResponse;
import com.example.server.model.Course;
import com.example.server.model.Module;
import com.example.server.repository.CourseRepository;
import com.example.server.repository.ModuleRepository;
import com.example.server.service.ModuleService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ModuleServiceImpl implements ModuleService {

  private final ModuleRepository moduleRepository;
  private final CourseRepository courseRepository;
  @Override
  @Transactional
  public List<Module> getAllModules() {
    return moduleRepository.findAll();
  }

  @Override
  public List<ModuleNameResponse> getAllModuleNamesByCourseId(Long id) {
    Optional<Course> courseOptional = courseRepository.findById(id);
    if (!courseOptional.isPresent()) {
      return new ArrayList<>();
    }
    Course course = courseOptional.get();
    List<Module> moduleList = course.getModuleList();
    return new ArrayList<>();
  }

  @Override
  public Optional<Module> getModuleById(Long id) {
    return moduleRepository.findById(id);
  }

  @Override
  public Module createModule(Module module) {
    return moduleRepository.save(module);
  }

  @Override
  public void deleteModule(Long id) {
    moduleRepository.deleteById(id);
  }

  @Override
  public ResponseEntity<Module> updateModule(Module moduleInfo, Long id) {
    Optional<Module> moduleData = moduleRepository.findById(id);
    if (moduleData.isPresent()) {
      Module _module = moduleData.get();
      _module.setName(moduleInfo.getName());
      _module.setLos(moduleInfo.getLos());
      return new ResponseEntity<>(moduleRepository.save(_module), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}
