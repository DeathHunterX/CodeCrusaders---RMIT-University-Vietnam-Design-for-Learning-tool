package com.example.server.api.response;

import com.example.server.model.Session;
import lombok.*;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ModuleSessionListResponse {
  private List<Session> sessionList;
}
