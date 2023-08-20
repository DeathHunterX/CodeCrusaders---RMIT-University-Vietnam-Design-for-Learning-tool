package com.example.server.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "pdf_comment")
public class Comment {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  private String content;

  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "replyTo")
  @JsonManagedReference
  private Set<Comment> replies = new HashSet<>();

  @ManyToOne
  @JsonBackReference
  private Comment replyTo;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id")
  @JsonBackReference
  private User user;

  @ManyToOne
  @JoinColumn(name = "link_id")
  @JsonIgnore
  private SharedCourseLink shareLink;

  public Comment(String content, List<Comment> replies, User user, SharedCourseLink sharedCourseLink) {
    this.content = content;
    this.user = user;
    this.shareLink = sharedCourseLink;
  }
}
