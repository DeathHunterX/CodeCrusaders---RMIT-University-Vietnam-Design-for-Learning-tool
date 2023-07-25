package com.example.server.controller;

import com.example.server.api.request.ModuleCreateRequest;
import com.example.server.api.request.ModuleRequest;
import com.example.server.api.response.ApiResponse;
import com.example.server.api.response.ModuleDetailsResponse;
import com.example.server.api.response.ModuleNameResponse;
import com.example.server.model.Course;
import com.example.server.model.Module;
import com.example.server.service.CourseService;
import com.example.server.service.ModuleService;
import lombok.RequiredArgsConstructor;
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
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("v1/api")
@RequiredArgsConstructor
public class ModuleController {
  private final ModuleService moduleService;
  private final CourseService courseService;

  @GetMapping("courses/{course_id}/module-names")
  public ResponseEntity<?> getAllModuleNamesByCourseId(@PathVariable UUID course_id) {
    Course course = courseService.getCourseById(course_id);
    List<Module> moduleList = course.getModuleList();
    if (moduleList.size()==0) {
      return new ResponseEntity<>(new ApiResponse("This course has no modules"),HttpStatus.OK);
    }
    return new ResponseEntity<>(moduleList.stream().map(e->new ModuleNameResponse(e.getId(),e.getName())).collect(Collectors.toList()),HttpStatus.OK);
  }

  @GetMapping("modules/{id}")
  public ResponseEntity<ModuleDetailsResponse> getModuleById(@PathVariable("id") UUID id) {
    ModuleDetailsResponse moduleDetailsResponse = moduleService.getModuleDetailsById(id);
    return new ResponseEntity<>(moduleDetailsResponse,HttpStatus.OK);
  }

  @PostMapping("courses/{course_id}/create-module")
  public ResponseEntity<?> createModule(@PathVariable UUID course_id, @RequestBody ModuleCreateRequest moduleCreateRequest) {
    return moduleService.createModule(course_id, moduleCreateRequest);
  }


  @PutMapping("/update-module/{id}")
  public ResponseEntity<Module> updateModule(@PathVariable("id") UUID id, @RequestBody ModuleRequest moduleInfo) {
    return moduleService.updateModule(moduleInfo,id);
  }

  @DeleteMapping("/delete-module/{id}")
  public ResponseEntity<ApiResponse> deleteModule(@PathVariable("id") UUID id) {
    moduleService.deleteModule(id);
    return new ResponseEntity<>(new ApiResponse("Successfully delete module"),HttpStatus.OK);
  }
}
