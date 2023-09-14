package com.example.server.api.request;

import com.example.server.model.Activity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.IntStream;

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

  public void organizeActivities() {
    IntStream.range(0, this.preClassActivities.size())
        .forEach(e -> preClassActivities.get(e).setOrderIndex(e));
    IntStream.range(0, this.inClassActivities.size())
        .forEach(e -> inClassActivities.get(e).setOrderIndex(e));
    IntStream.range(0, this.postClassActivities.size())
        .forEach(e -> postClassActivities.get(e).setOrderIndex(e));

  }
}
