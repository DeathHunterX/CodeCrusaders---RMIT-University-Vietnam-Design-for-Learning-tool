package com.example.server.api.response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class CourseResponse {
    private Long id;
    private String courseName;
    private String semester;
}
