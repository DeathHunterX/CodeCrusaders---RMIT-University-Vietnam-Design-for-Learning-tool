package com.example.server.api.response;

import com.example.server.model.Assignment;
import com.example.server.model.Session;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ModuleDetailsResponse {
    //module
    private String name;
    private String los;
    private int moduleWeek;
    private List<Session> sessionList;
    private String shareLink;

    //course
    private String courseName;
    private String courseCode;
    private String courseSemester;
    private String clos;
    private List<Assignment> assignmentList;
}
