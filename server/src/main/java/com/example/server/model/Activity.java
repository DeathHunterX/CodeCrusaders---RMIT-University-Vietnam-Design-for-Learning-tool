package com.example.server.model;

import com.example.server.model.enums.ActivityType;
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
@Inheritance(strategy = InheritanceType.JOINED)
@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "activity_id")
    private UUID id;

    @Enumerated(EnumType.STRING)
    private ActivityType activityType;

    private Integer duration;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id")
    @JsonIgnore
    private Session session;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;
}


