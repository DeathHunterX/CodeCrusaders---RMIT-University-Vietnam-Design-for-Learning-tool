package com.example.server.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.*;

@Entity
@Data
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String courseName;
    private String semester;

    @ElementCollection
    private List<String> clos = new ArrayList<>();

    @ManyToMany(mappedBy = "courses")
    private Set<User> userSet = new HashSet<>();

    @OneToMany(mappedBy = "course")
    private List<Assignment> assignmentList = new ArrayList<>();



}
