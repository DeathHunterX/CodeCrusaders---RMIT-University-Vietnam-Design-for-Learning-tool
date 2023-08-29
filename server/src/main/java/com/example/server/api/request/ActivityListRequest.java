package com.example.server.api.request;

import com.example.server.model.Activity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivityListRequest {
  private UUID preClassId;
  private UUID inClassId;
  private UUID postClassId;
  private List<Activity> preClassActivities = new ArrayList<>();
  private List<Activity> inClassActivities = new ArrayList<>();
  private List<Activity> postClassActivities = new ArrayList<>();
}
