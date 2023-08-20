package com.example.server.api.response;

import com.example.server.model.Assignment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CourseDetailsReponse {
  private String courseName;
  private String courseCode;
  private String courseSemester;
  private String clos;
  private List<Assignment> assignmentList;
}
