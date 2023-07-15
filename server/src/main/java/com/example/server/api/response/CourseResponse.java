package com.example.server.api.response;

import lombok.*;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class CourseResponse {
    private UUID id;
    private String courseName;
    private String courseCode;
    private String courseSemester;
    private String clos;
}
