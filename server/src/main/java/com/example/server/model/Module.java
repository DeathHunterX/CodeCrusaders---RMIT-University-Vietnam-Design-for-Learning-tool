package com.example.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Module {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "module_id")
  private UUID id;

  private String name;

  @Column(length = 1000000000)
  private String los;

  private int moduleWeek;

  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "module")
  private List<Session> sessionList = new ArrayList<>();

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "course_id")
  @JsonIgnore
  private Course course;

  public Module(String name, String los) {
    this.name = name;
    this.los = los;
  }

  public Module(String name, List<Session> sessionList) {

    this.name = name;
    this.sessionList = sessionList;
  }

  public void setSessionList(List<Session> sessionList) {
    this.sessionList.clear();
    this.sessionList.addAll(sessionList);
  }
}
