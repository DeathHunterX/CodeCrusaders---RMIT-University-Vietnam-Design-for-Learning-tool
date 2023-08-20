package com.example.server.api.response;

import com.example.server.model.Assignment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PDFResponse {
  private ModuleDetailsResponse moduleDetailsResponse;
  private CourseDetailsReponse courseDetailsReponse;
}
