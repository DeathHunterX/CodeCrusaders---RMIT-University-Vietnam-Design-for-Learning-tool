package com.example.server.api.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivityRequest {
  private String activityID;
  private String activityName;
  private Integer duration;
  private String accessType;
  private String collaborateType;
  private String groupType;
  private String reflectionType;
  private String warmUpOption;
  private String engagementOption;
}
