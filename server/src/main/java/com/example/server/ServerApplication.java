package com.example.server;

import com.example.server.model.*;
import com.example.server.model.Module;
import com.example.server.model.enums.GroupingType;
import com.example.server.model.enums.SessionOption;
import com.example.server.model.enums.SessionType;
import com.example.server.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDate;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@SpringBootApplication
@RequiredArgsConstructor
public class ServerApplication implements CommandLineRunner {
  private final CourseRepository courseRepository;

  private final UserRepository userRepository;

  private final AssignmentRepository assignmentRepository;

  private final BCryptPasswordEncoder passwordEncoder;

  private final ModuleRepository moduleRepository;

  private final SessionRepository sessionRepository;

  public static void main(String[] args) {
    SpringApplication.run(ServerApplication.class, args);
  }

  @Override
  public void run(String... args) throws Exception {
    courseRepository.deleteAll();
    userRepository.deleteAll();
    assignmentRepository.deleteAll();
    moduleRepository.deleteAll();

    Assignment assignment1 = new Assignment(1,"Early assessment 1",  LocalDate.of(2023, 7, 6),LocalDate.of(2023, 6, 6));
    Assignment assignment2 = new Assignment(2,"Mid-term 1",  LocalDate.of(2023, 8, 6),LocalDate.of(2023, 6, 6));
    Assignment assignment3 = new Assignment(3,"Final 1",  LocalDate.of(2023, 9, 6),LocalDate.of(2023, 6, 6));
    Assignment assignment4 = new Assignment(1,"Early assessment 2",  LocalDate.of(2023, 4, 6),LocalDate.of(2023, 6, 6));
    Assignment assignment5 = new Assignment(2,"Mid-term 2",  LocalDate.of(2023, 5, 6),LocalDate.of(2023, 6, 6));
    Assignment assignment6 = new Assignment(3,"Final 2",  LocalDate.of(2023, 6, 6),LocalDate.of(2023, 6, 6));
    Assignment assignment7 = new Assignment(1,"Early assessment 3",  LocalDate.of(2023, 1, 6),LocalDate.of(2023, 6, 6));
    Assignment assignment8 = new Assignment(2,"Mid-term 3",  LocalDate.of(2023, 2, 6),LocalDate.of(2023, 6, 6));
    Assignment assignment9 = new Assignment(3,"Final 3",  LocalDate.of(2023, 3, 6),LocalDate.of(2023, 6, 6));

    Module module1 = new Module("module1", "los1,los2,los3");
    Module module2 = new Module("module2","los1,los2,los3");
    Module module3 = new Module("module3","los1,los2,los3");


    Course course1 = new Course("Machine Learning","CA","Semester A 2020","clos1,clos2,clos3");
    Course course2 = new Course("Object Oriented Programming","OOP","Semester A 2021","clos1,clos2,clos3");
    Course course3 = new Course("Computer Vision","CV","Semester C 2022","clos1,clos2,clos3");
    Course course4 = new Course("Python","PY","Semester B 2023","clos1,clos2,clos3");
    Course course5 = new Course("ReactJS","RJ","Semester A 2019","clos1,clos2,clos3");

    assignment1.setCourse(course1);
    assignment2.setCourse(course1);
    assignment3.setCourse(course1);
    assignment4.setCourse(course3);
    assignment5.setCourse(course3);
    assignment6.setCourse(course3);
    assignment7.setCourse(course2);
    assignment8.setCourse(course2);
    assignment9.setCourse(course2);

    module1.setCourse(course1);
    module2.setCourse(course1);
    module3.setCourse(course1);

    Session preClass = new Session(SessionType.PRE_CLASS, GroupingType.SMALL_GROUP, SessionOption.F2F,Boolean.TRUE);
    Session inClass = new Session(SessionType.IN_CLASS, GroupingType.INDIVIDUAL, SessionOption.HYBRID,Boolean.TRUE);
    Session postClass = new Session(SessionType.POST_CLASS, GroupingType.CLASS, SessionOption.ONLINE,Boolean.TRUE);
    preClass.setModule(module1);
    inClass.setModule(module1);
    postClass.setModule(module1);

    User user1 = new User();
    user1.setName("Khang");
    user1.setUsername("khang123");

    user1.setPassword(passwordEncoder.encode("12345678"));
    Set<Course> courses = new HashSet<>(List.of(course1,course2));
    user1.setCourses(courses);

    courseRepository.saveAll(List.of(course1,course2,course3,course4,course5));
    userRepository.save(user1);
    moduleRepository.saveAll(List.of(module1,module2,module3));
    sessionRepository.saveAll(List.of(preClass, inClass, postClass));

    assignmentRepository.saveAll(List.of(assignment1,assignment2,assignment3,assignment4,assignment5,assignment6, assignment7, assignment8, assignment9));









  }
}