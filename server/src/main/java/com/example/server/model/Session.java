package com.example.server.model;


import com.example.server.model.enums.GroupingType;
import com.example.server.model.enums.InteractionType;
import com.example.server.model.enums.SessionOption;
import com.example.server.model.enums.SessionName;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Session {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "session_id")
  private UUID id;

  @Enumerated(EnumType.STRING)
  private SessionName sessionName = SessionName.POST_CLASS;

  @Enumerated(EnumType.STRING)
  private GroupingType groupingType = GroupingType.INDIVIDUAL;

  @Enumerated(EnumType.STRING)
  private SessionOption sessionOption = SessionOption.F2F;

  @Enumerated(EnumType.STRING)
  private InteractionType interactionType = InteractionType.SYNCHRONOUS;

  private Boolean hasLecturer = Boolean.TRUE;

  private int totalDuration;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "module_id")
  @JsonIgnore
  private Module module;

  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "session")
  private List<Activity> activityList = new ArrayList<>();

  public Session(SessionName sessionName, GroupingType groupingType, SessionOption sessionOption, Boolean hasLecturer, InteractionType interactionType) {
    this.sessionName = sessionName;
    this.groupingType = groupingType;
    this.sessionOption = sessionOption;
    this.hasLecturer = hasLecturer;
    this.interactionType = interactionType;
  }

  public Session(SessionName sessionName) {
    this.sessionName = sessionName;
  }


}
