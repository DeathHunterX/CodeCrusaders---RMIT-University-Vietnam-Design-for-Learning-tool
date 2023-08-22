package com.example.server;

import com.example.server.model.*;
import com.example.server.model.Module;
import com.example.server.model.enums.GroupingType;
import com.example.server.model.enums.InteractionType;
import com.example.server.model.enums.SessionOption;
import com.example.server.model.enums.SessionName;
import com.example.server.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDate;

import java.util.*;

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
  @Transactional
  public void run(String... args) throws Exception {
    userRepository.deleteAll();
    courseRepository.deleteAll();
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

    Module module1 = new Module("module1","");
    Module module2 = new Module("module2","");
    Module module3 = new Module("module3","");

    Module module4 = new Module("module4","");
    Module module5 = new Module("module5","");
    Module module6 = new Module("module6","");


    Course course1 = new Course("Course 01","BP0580","Semester 1 - 2020","<p>Hello World!</p>");
    Course course2 = new Course("Course 02","BP0475","Semester 1 - 2021","<p>Hello World!</p>");
    Course course3 = new Course("Course 03","BP0152","Semester 3 - 2022","<p>Hello World!</p>");
    Course course4 = new Course("Course 04","BP0273","Semester 2 - 2023","<p>Hello World!</p>");
    Course course5 = new Course("Course 05","BP0576","Semester 1 - 2019","<p>Hello World!</p>");

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

    module4.setCourse(course2);
    module5.setCourse(course2);
    module6.setCourse(course2);


    Session preClass = new Session(SessionName.PRE_CLASS, GroupingType.CLASS, SessionOption.F2F,Boolean.TRUE, InteractionType.ASYNCHRONOUS);
    Session inClass = new Session(SessionName.IN_CLASS, GroupingType.INDIVIDUAL, SessionOption.HYBRID,Boolean.TRUE, InteractionType.SYNCHRONOUS);
    Session postClass = new Session(SessionName.POST_CLASS, GroupingType.CLASS, SessionOption.ONLINE,Boolean.TRUE, InteractionType.ASYNCHRONOUS);
    Session preClass1 = new Session(SessionName.PRE_CLASS, GroupingType.INDIVIDUAL, SessionOption.HYBRID,Boolean.TRUE, InteractionType.ASYNCHRONOUS);
    Session inClass1 = new Session(SessionName.IN_CLASS, GroupingType.INDIVIDUAL, SessionOption.HYBRID,Boolean.TRUE, InteractionType.SYNCHRONOUS);
    Session postClass1 = new Session(SessionName.POST_CLASS, GroupingType.CLASS, SessionOption.ONLINE,Boolean.TRUE, InteractionType.ASYNCHRONOUS);
    Session preClass2 = new Session(SessionName.PRE_CLASS, GroupingType.INDIVIDUAL, SessionOption.HYBRID,Boolean.TRUE, InteractionType.SYNCHRONOUS);
    Session inClass2 = new Session(SessionName.IN_CLASS, GroupingType.INDIVIDUAL, SessionOption.HYBRID,Boolean.TRUE, InteractionType.ASYNCHRONOUS);
    Session postClass2 = new Session(SessionName.POST_CLASS, GroupingType.CLASS, SessionOption.ONLINE,Boolean.TRUE, InteractionType.SYNCHRONOUS);

    Session preClass3 = new Session(SessionName.PRE_CLASS, GroupingType.CLASS, SessionOption.F2F,Boolean.TRUE, InteractionType.SYNCHRONOUS);
    Session inClass3 = new Session(SessionName.IN_CLASS, GroupingType.INDIVIDUAL, SessionOption.HYBRID,Boolean.TRUE, InteractionType.ASYNCHRONOUS);
    Session postClass3 = new Session(SessionName.POST_CLASS, GroupingType.CLASS, SessionOption.ONLINE,Boolean.TRUE, InteractionType.SYNCHRONOUS);
    Session preClass4 = new Session(SessionName.PRE_CLASS, GroupingType.CLASS, SessionOption.HYBRID,Boolean.TRUE, InteractionType.ASYNCHRONOUS);
    Session inClass4 = new Session(SessionName.IN_CLASS, GroupingType.INDIVIDUAL, SessionOption.HYBRID,Boolean.TRUE, InteractionType.SYNCHRONOUS);
    Session postClass4 = new Session(SessionName.POST_CLASS, GroupingType.CLASS, SessionOption.ONLINE,Boolean.TRUE, InteractionType.ASYNCHRONOUS);
    Session preClass5 = new Session(SessionName.PRE_CLASS, GroupingType.INDIVIDUAL, SessionOption.HYBRID,Boolean.TRUE, InteractionType.SYNCHRONOUS);
    Session inClass5 = new Session(SessionName.IN_CLASS, GroupingType.INDIVIDUAL, SessionOption.HYBRID,Boolean.TRUE, InteractionType.ASYNCHRONOUS);
    Session postClass5 = new Session(SessionName.POST_CLASS, GroupingType.CLASS, SessionOption.ONLINE,Boolean.TRUE, InteractionType.SYNCHRONOUS);

    preClass.setModule(module1);
    inClass.setModule(module1);
    postClass.setModule(module1);

    preClass1.setModule(module2);
    inClass1.setModule(module2);
    postClass1.setModule(module2);

    preClass1.setModule(module3);
    inClass1.setModule(module3);
    postClass1.setModule(module3);

    preClass3.setModule(module4);
    inClass3.setModule(module4);
    postClass3.setModule(module4);

    preClass4.setModule(module5);
    inClass4.setModule(module5);
    postClass4.setModule(module5);

    preClass5.setModule(module6);
    inClass5.setModule(module6);
    postClass5.setModule(module6);


    User user1 = new User();
    user1.setName("Khang");
    user1.setUsername("khang123");
    user1.setPassword(passwordEncoder.encode("12345678"));
    Set<Course> courses = new HashSet<>(List.of(course1,course2));
    user1.setCourses(courses);

    User user2 = new User();
    user2.setName("Loi");
    user2.setUsername("loi123");
    user2.setPassword(passwordEncoder.encode("12345678"));
    Set<Course> courses2 = new HashSet<>(List.of(course3,course4,course5));
    user2.setCourses(courses2);

    courseRepository.saveAll(List.of(course1,course2,course3,course4,course5));
    userRepository.saveAll(List.of(user1,user2));

    moduleRepository.saveAll(List.of(module1,module2,module3,module4,module5,module6));
    sessionRepository.saveAll(List.of(preClass, inClass, postClass, preClass1, inClass1, postClass1, preClass2, inClass2, postClass2,preClass3,inClass3,postClass3,preClass4,inClass4,postClass4,preClass5,inClass5,postClass5));
    assignmentRepository.saveAll(List.of(assignment1,assignment2,assignment3,assignment4,assignment5,assignment6, assignment7, assignment8, assignment9));;








  }
}