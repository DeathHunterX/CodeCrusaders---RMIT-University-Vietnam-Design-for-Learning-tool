package com.example.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String courseName;

    private String courseCode;

    private String semester;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> clos;

    @ManyToMany(mappedBy = "courses")
    @JsonIgnore
    private Set<User> userSet;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "course")
    private List<Assignment> assignmentList;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "course")
    private List<Module> moduleList;


    public Course(String courseName, String courseCode, String semester, List<String> clos) {
        this.courseName = courseName;
        this.courseCode = courseCode;
        this.semester = semester;
        this.clos = clos;
    }


}
