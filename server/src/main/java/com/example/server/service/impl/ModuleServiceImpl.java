package com.example.server.service.impl;

import com.example.server.api.request.ModuleCreateRequest;
import com.example.server.api.request.ModuleRequest;
import com.example.server.api.response.ApiResponse;
import com.example.server.api.response.ModuleDetailsResponse;
import com.example.server.api.response.ModuleNameResponse;
import com.example.server.exception.ObjectNotFoundException;
import com.example.server.model.Course;
import com.example.server.model.Module;
import com.example.server.model.Session;
import com.example.server.model.enums.SessionName;
import com.example.server.repository.CourseRepository;
import com.example.server.repository.ModuleRepository;
import com.example.server.service.CourseService;
import com.example.server.service.ModuleService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ModuleServiceImpl implements ModuleService {

    private final ModuleRepository moduleRepository;
    private final CourseRepository courseRepository;
    private final UserDetailsServiceImpl userDetailsService;
    private final CourseService courseService;

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
                .orElseThrow(() -> new ObjectNotFoundException("Module", "id", 404));
        List<Session> sessionList = module.getSessionList();
        ModuleDetailsResponse moduleDetailsResponse = new ModuleDetailsResponse(module.getName(), module.getLos(), sessionList);
        return moduleDetailsResponse;
    }

    @Override
    public ResponseEntity<?> createModule(UUID courseId, ModuleCreateRequest moduleCreateRequest) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ObjectNotFoundException("Course", "id"));
        System.out.println("Can find course");
        Session preClass = new Session(SessionName.PRE_CLASS);
        Session inClass = new Session(SessionName.IN_CLASS);
        Session postClass = new Session(SessionName.POST_CLASS);
        List<Session> sessionList = new ArrayList<>();
        sessionList.addAll(List.of(preClass, inClass, postClass));
        Module module = new Module(moduleCreateRequest.getModuleName(), sessionList);
        System.out.println("set module");

        sessionList.stream().forEach(e -> e.setModule(module));
        module.setCourse(course);
        return new ResponseEntity<>(moduleRepository.save(module), HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<?> deleteModule(UUID courseId, UUID moduleId) {
        var user = userDetailsService.getCurrentUser();
        var course = courseService.getCourseById(courseId);
        if (user == null || !userDetailsService.checkCourseOwnership(user, course)) {
            return new ResponseEntity<>(new ApiResponse("You don't have permission to view/modify this module"), HttpStatus.OK);
        }
        var moduleOptional = moduleRepository.findById(moduleId);
        if(!moduleOptional.isPresent()) {
            throw new ObjectNotFoundException("module", "id");
        }
        var module = moduleOptional.get();
        course.getModuleList().remove(module);
        module.setCourse(null);
        moduleRepository.save(module);
        courseRepository.save(course);
        return new ResponseEntity<>(new ApiResponse("Successfully delete module"),HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Module> updateModule(ModuleRequest moduleRequest, UUID id) {
        var _module = moduleRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Module", "id"));
        _module.setName(moduleRequest.getName());
        _module.setLos(moduleRequest.getLos());
        _module.setSessionList(moduleRequest.getSessionList());
        return new ResponseEntity<>(moduleRepository.save(_module), HttpStatus.OK);
    }
}
