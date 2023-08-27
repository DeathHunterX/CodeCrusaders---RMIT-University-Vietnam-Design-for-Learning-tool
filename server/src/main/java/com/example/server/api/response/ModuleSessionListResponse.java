package com.example.server.api.response;

import com.example.server.model.Session;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class ModuleSessionListResponse {
  private List<Session> sessionList;
}
