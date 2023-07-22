package com.example.server.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Builder
public class AssignmentRequest {
    private Integer assignmentNo;
    private String assignmentName;
    private LocalDate startDate;
    private LocalDate endDate;
}
