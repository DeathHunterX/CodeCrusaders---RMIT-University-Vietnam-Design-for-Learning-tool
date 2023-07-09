package com.example.server.api.request;

import com.example.server.model.Assignment;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.FetchType;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CourseRequest {
    private String courseName;

    private String courseCode;

    private String semester;

    private List<String> clos;

    private List<Assignment> assignmentList;
}
