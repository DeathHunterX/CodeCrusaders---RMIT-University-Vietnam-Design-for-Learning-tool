package com.example.server.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

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

    private void updateCourse(Course newCourse) {
        this.courseName = newCourse.getCourseName();
        this.semester = newCourse.getSemester();
        this.clos = newCourse.getClos();
        this.assignmentList = newCourse.getAssignmentList();
    }

    public Course(String courseName, String semester, List<String> clos) {
        this.courseName = courseName;
        this.semester = semester;
        this.clos = clos;
    }


}
