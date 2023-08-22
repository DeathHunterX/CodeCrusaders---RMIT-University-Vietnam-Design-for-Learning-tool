package com.example.server.api.response;

import com.example.server.model.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PDFResponse {
  private ModuleDetailsResponse moduleDetailsResponse;
  private CourseDetailsReponse courseDetailsReponse;
  private List<Comment> comments = new ArrayList<>();
}
