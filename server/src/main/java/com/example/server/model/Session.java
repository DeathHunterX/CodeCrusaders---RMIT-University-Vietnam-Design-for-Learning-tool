package com.example.server.model;


import com.example.server.model.enums.GroupingType;
import com.example.server.model.enums.SessionOption;
import com.example.server.model.enums.SessionType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Session {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Enumerated(EnumType.STRING)
  private SessionType sessionType;

  @Enumerated(EnumType.STRING)
  private GroupingType groupingType;

  @Enumerated(EnumType.STRING)
  private SessionOption sessionOption;

  private Boolean hasLecturer;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "module_id")
  @JsonIgnore
  private Module module;

  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "session")
  private List<Activity> activityList = new ArrayList<>();

  public Session(SessionType sessionType, GroupingType groupingType, SessionOption sessionOption, Boolean hasLecturer) {
    this.sessionType = sessionType;
    this.groupingType = groupingType;
    this.sessionOption = sessionOption;
    this.hasLecturer = hasLecturer;
  }


}
