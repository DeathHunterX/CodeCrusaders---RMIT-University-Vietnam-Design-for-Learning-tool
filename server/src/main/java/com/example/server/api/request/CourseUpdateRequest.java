package com.example.server.api.request;

import com.example.server.model.Assignment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CourseUpdateRequest {
    private String courseCode;

    private String courseSemester;

    private String clos;

    private List<Assignment> assignmentList;
}
