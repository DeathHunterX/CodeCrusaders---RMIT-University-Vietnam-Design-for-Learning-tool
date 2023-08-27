package com.example.server.api.request;

import com.example.server.model.enums.GroupingType;
import com.example.server.model.enums.InteractionType;
import com.example.server.model.enums.SessionName;
import com.example.server.model.enums.SessionOption;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import lombok.Getter;

@Getter
public class SessionRequest {
  private SessionName sessionName;
  private GroupingType groupingType;
  private SessionOption sessionOption;
  private InteractionType interactionType;
  private Boolean hasLecturer;
}
