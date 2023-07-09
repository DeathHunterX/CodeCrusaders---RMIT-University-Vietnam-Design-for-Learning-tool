package com.example.server.controller;

import com.example.server.api.response.ModuleNameResponse;
import com.example.server.model.Course;
import com.example.server.model.Module;
import com.example.server.service.CourseService;
import com.example.server.service.ModuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("v1/api")
@RequiredArgsConstructor
public class ModuleController {
  private final ModuleService moduleService;
  private final CourseService courseService;

  @GetMapping("modules")
  public List<Module> getAllModules() {
    return moduleService.getAllModules();
  }

//  @GetMapping("courses/{course_id}/module-names")
//  public List<ModuleNameResponse> getAllModuleNamesByCourseId(@PathVariable Long course_id) {
//  }

  @GetMapping("modules/{id}")
  public Optional<Module> getModuleById(@PathVariable("id") Long id) {
    return moduleService.getModuleById(id);
  }

  @PostMapping("/create-module")
  public ResponseEntity<Module> createModule(@RequestBody Module module) {
    return ResponseEntity.ok(moduleService.createModule(module));
  }

  @PutMapping("/update-module/{id}")
  public ResponseEntity<Module> updateModule(@PathVariable("id") Long id, @RequestBody Module moduleInfo) {
    return moduleService.updateModule(moduleInfo,id);
  }

  @DeleteMapping("/delete-module/{id}")
  public String deleteModule(@PathVariable("id") Long id) {
    moduleService.deleteModule(id);
    return "";
  }
}
