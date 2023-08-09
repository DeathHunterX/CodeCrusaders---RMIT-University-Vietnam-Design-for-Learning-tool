package com.example.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "course_id")
    private UUID id;

    private String courseName;

    private String courseCode;

    private String courseSemester;

    @Column(length = 1000000000)
    private String clos;

    @ManyToMany(mappedBy = "courses")
    @JsonIgnore
    private Set<User> userSet;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "course")
    @Size(max = 3)
    private List<Assignment> assignmentList = new ArrayList<>() ;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "course")
    private List<Module> moduleList;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Activity> activityList = new ArrayList<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<SharedCourseLink> sharedCourseLinks = new HashSet<>();


    public Course(String courseName, String courseCode, String semester, String clos) {
        this.courseName = courseName;
        this.courseCode = courseCode;
        this.courseSemester = semester;
        this.clos = clos;
    }

    public void setAssignmentList(List<Assignment> assignmentList) {
        System.out.println("call set assignment");
        if (assignmentList.size() > 3) {
            throw new IllegalArgumentException("A course can only have three assignments.");
        }
        this.assignmentList.clear();
        this.assignmentList.addAll(assignmentList);
        for (Assignment assignment : assignmentList) {
            assignment.setCourse(this);
        }
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
