package com.example.server.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class SharedCourseLink {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id")
  @JsonIgnore
  private User user;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "module_id")
  @JsonIgnore
  private Module module;

  @Column(unique = true, nullable = false, length = 32)
  private String shareLink;

  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "shareLink", orphanRemoval = true)
  private List<Comment> commentList = new ArrayList<>();

  public SharedCourseLink(User user, Module module, String shareLink, List<Comment> commentList) {
    this.user = user;
    this.module = module;
    this.shareLink = shareLink;
    this.commentList = commentList;
  }
}
