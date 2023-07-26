package com.example.server.controller;

import com.example.server.service.ActivityService;
import com.example.server.service.CourseService;
import com.example.server.service.ModuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("v1/api")
@RequiredArgsConstructor
public class ActivityController {
    private final ModuleService moduleService;
    private final CourseService courseService;
    private final ActivityService activityService;

//    @PutMapping("courses/{course_id}/modules/{module_id}/add-activity")
//    public ResponseEntity<?> addActivityToModule(
//            @PathVariable("course_id") UUID courseId,
//            @PathVariable("module_id") UUID moduleId,
//            )
}
