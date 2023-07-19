package com.example.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="assignment_id")
    private UUID id;

    private Integer assignmentNo;

    private String assignmentName;


    @Column(columnDefinition = "DATE")
    private LocalDate startDate;

    @Column(columnDefinition = "DATE")
    private LocalDate endDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    @JsonIgnore
    private Course course;

    public Assignment(Integer assignmentNo, String assignmentName, LocalDate startDate, LocalDate endDate) {
        this.assignmentNo = assignmentNo;
        this.assignmentName = assignmentName;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
