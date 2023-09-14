package com.example.server.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id")
  @JsonIgnoreProperties({"username", "password", "refreshToken", "courses", "sharedCourseLinks", "commentList", "id", "enabled", "accountNonExpired", "accountNonLocked", "credentialsNonExpired", "authorities"})
  private User user;

  @ManyToOne
  @JoinColumn(name = "link_id")
  @JsonIgnore
  private SharedCourseLink shareLink;

  private String dateTime;


}
