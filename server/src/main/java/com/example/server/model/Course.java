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
    private String semester;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> clos = new ArrayList<>();

    @ManyToMany(mappedBy = "courses")
    @JsonIgnore
    private Set<User> userSet = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "course")
    private List<Assignment> assignmentList = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "course")
    private List<Module> moduleList = new ArrayList<>();


    public Course(String courseName, String semester, List<String> clos) {
        this.courseName = courseName;
        this.semester = semester;
        this.clos = clos;
    }


}
