package com.example.server.api.response;

import com.example.server.model.Assignment;
import com.example.server.model.Module;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CourseInfoResponse {
    private String courseName;
    private String courseCode;
    private String courseSemester;
    private String clos;
    private List<Assignment> assignmentList;
    private List<Module> moduleList;
}
