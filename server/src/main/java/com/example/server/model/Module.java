package com.example.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.*;

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

  @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
  @JoinColumn(name = "share_link_id", referencedColumnName = "id")
  private SharedCourseLink sharedCourseLinks;


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

  public String generateShareLink() {
    String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    int length = 10; // You can adjust the length of the share link as needed
    StringBuilder shareLinkBuilder = new StringBuilder();
    Random random = new Random();
    for (int i = 0; i < length; i++) {
      int index = random.nextInt(characters.length());
      char randomChar = characters.charAt(index);
      shareLinkBuilder.append(randomChar);
    }
    String shareLink = shareLinkBuilder.toString();
    return shareLink;
  }
}
