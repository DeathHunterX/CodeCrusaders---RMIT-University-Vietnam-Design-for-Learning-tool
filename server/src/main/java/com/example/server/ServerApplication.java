package com.example.server;

import com.example.server.model.Assignment;
import com.example.server.model.Course;
import com.example.server.model.Module;
import com.example.server.model.User;
import com.example.server.repository.AssignmentRepository;
import com.example.server.repository.CourseRepository;
import com.example.server.repository.ModuleRepository;
import com.example.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@SpringBootApplication
@RequiredArgsConstructor
public class ServerApplication implements CommandLineRunner {
  private final CourseRepository courseRepository;

  private final UserRepository userRepository;

  private final AssignmentRepository assignmentRepository;

  private final PasswordEncoder bCryptPasswordEncoder;

  private final ModuleRepository moduleRepository;

  public static void main(String[] args) {
    SpringApplication.run(ServerApplication.class, args);
  }

  @Override
  public void run(String... args) throws Exception {
    courseRepository.deleteAll();
    userRepository.deleteAll();
    assignmentRepository.deleteAll();
    moduleRepository.deleteAll();

    Assignment assignment1 = new Assignment("Assignment 1", "des",  LocalDate.of(2023, 1, 6),LocalDate.of(2023, 6, 6));
    Assignment assignment2 = new Assignment("Assignment 2", "des",  LocalDate.of(2023, 1, 6),LocalDate.of(2023, 6, 6));
    Assignment assignment3 = new Assignment("Assignment 3", "des",  LocalDate.of(2023, 1, 6),LocalDate.of(2023, 6, 6));
    Assignment assignment4 = new Assignment("Assignment 4", "des",  LocalDate.of(2023, 1, 6),LocalDate.of(2023, 6, 6));
    Assignment assignment5 = new Assignment("Assignment 5", "des",  LocalDate.of(2023, 1, 6),LocalDate.of(2023, 6, 6));
    Assignment assignment6 = new Assignment("Assignment 6", "des",  LocalDate.of(2023, 1, 6),LocalDate.of(2023, 6, 6));

    List<String> clos1 = new ArrayList<>(List.of("clos1","clos2","clos3"));
    List<String> clos2 = new ArrayList<>(List.of("clos1","clos3","clos5"));
    List<String> clos3 = new ArrayList<>(List.of("clos8","clos0","clos2"));

    Module module1 = new Module("module1",Arrays.asList("los1","los2","los3"));
    Module module2 = new Module("module2",Arrays.asList("los2","los3","los4"));
    Module module3 = new Module("module3",Arrays.asList("los5","los6","los7"));


    Course course1 = new Course("Machine Learning","Semester A 2020",clos1);
    Course course2 = new Course("Object Oriented Programming","Semester A 2021",clos2);
    Course course3 = new Course("Computer Vision","Semester C 2022",clos3);
    Course course4 = new Course("Python","Semester B 2023",clos3);
    Course course5 = new Course("ReactJS","Semester A 2019",clos2);

    assignment1.setCourse(course1);
    assignment1.setCourse(course3);
    assignment2.setCourse(course1);
    assignment3.setCourse(course4);
    assignment4.setCourse(course1);
    assignment5.setCourse(course4);
    assignment6.setCourse(course5);
    assignment2.setCourse(course1);
    assignment3.setCourse(course2);

    module1.setCourse(course1);
    module2.setCourse(course1);
    module3.setCourse(course1);

    User user1 = new User();
    user1.setName("Khang");
    user1.setUsername("khang123");
    user1.setPassword(bCryptPasswordEncoder.encode("123"));
    Set<Course> courses = new HashSet<>(List.of(course1,course2));
    user1.setCourses(courses);

    courseRepository.saveAll(List.of(course1,course2,course3,course4,course5));
    userRepository.save(user1);
    moduleRepository.saveAll(List.of(module1,module2,module3));

    assignmentRepository.saveAll(List.of(assignment1,assignment2,assignment3,assignment4,assignment5,assignment6));









  }
}