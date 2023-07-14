package com.example.server.api.response;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class CourseResponse {
    private Long id;
    private String courseName;
    private String semester;
    private List<String> clos;
}
