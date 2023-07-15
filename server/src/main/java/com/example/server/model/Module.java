package com.example.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Module {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "module_id")
  private UUID id;

  private String name;

  private String los;

  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "module")
  private List<Session> sessionList = new ArrayList<>();

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "course_id")
  @JsonIgnore
  private Course course;

  public Module(String name, String los) {
    this.name = name;
    this.los = los;
  }
}
