package com.example.server;

import com.example.server.model.Assignment;
import com.example.server.model.Course;
import com.example.server.repository.AssignmentRepository;
import com.example.server.repository.CourseRepository;
import com.example.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@SpringBootApplication
public class ServerApplication implements CommandLineRunner {
  @Autowired
  private CourseRepository courseRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private AssignmentRepository assignmentRepository;

  public static void main(String[] args) {
    SpringApplication.run(ServerApplication.class, args);
  }

  @Override
  public void run(String... args) throws Exception {
    courseRepository.deleteAll();
    userRepository.deleteAll();
    assignmentRepository.deleteAll();

    Assignment assignment1 = new Assignment("Assignment 1", "des",  LocalDate.of(2023, 1, 6),LocalDate.of(2023, 6, 6));
    Assignment assignment2 = new Assignment("Assignment 2", "des",  LocalDate.of(2023, 1, 6),LocalDate.of(2023, 6, 6));
    Assignment assignment3 = new Assignment("Assignment 3", "des",  LocalDate.of(2023, 1, 6),LocalDate.of(2023, 6, 6));
    Assignment assignment4 = new Assignment("Assignment 4", "des",  LocalDate.of(2023, 1, 6),LocalDate.of(2023, 6, 6));
    Assignment assignment5 = new Assignment("Assignment 5", "des",  LocalDate.of(2023, 1, 6),LocalDate.of(2023, 6, 6));
    Assignment assignment6 = new Assignment("Assignment 6", "des",  LocalDate.of(2023, 1, 6),LocalDate.of(2023, 6, 6));

    String[] arr = {"clos1","clos2","clos3","clos4"};
    List<String> clos1 = new ArrayList<>(Arrays.asList("clos1","clos2","clos3"));
    List<String> clos2 = new ArrayList<>(Arrays.asList("clos1","clos3","clos5"));
    List<String> clos3 = new ArrayList<>(Arrays.asList("clos8","clos0","clos2"));

    Course course1 = new Course("Machine Learning","Semester A 2020",clos1);
    course1.getAssignmentList().add(assignment1);
    course1.getAssignmentList().add(assignment2);
    Course course2 = new Course("Object Oriented Programming","Semester A 2021",clos2);
    course2.getAssignmentList().add(assignment3);
    course2.getAssignmentList().add(assignment4);

    Course course3 = new Course("Computer Vision","Semester C 2022",clos3);
    course3.getAssignmentList().add(assignment5);
    Course course4 = new Course("Python","Semester B 2023",clos3);
    course4.getAssignmentList().add(assignment6);
    Course course5 = new Course("ReactJS","Semester A 2019",clos2);
    courseRepository.saveAll(Arrays.asList(course1,course2,course3,course4,course5));
    assignmentRepository.saveAll(Arrays.asList(assignment1,assignment2,assignment3,assignment4,assignment5,assignment6));








  }
}