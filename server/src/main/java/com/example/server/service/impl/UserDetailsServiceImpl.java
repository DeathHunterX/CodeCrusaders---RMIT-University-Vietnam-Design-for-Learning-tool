package com.example.server.service.impl;

import com.example.server.exception.InvalidUsernameException;
import com.example.server.exception.ObjectNotFoundException;
import com.example.server.model.Course;
import com.example.server.model.CustomUserDetails;
import com.example.server.model.User;
import com.example.server.repository.CourseRepository;
import com.example.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService {
  private final UserRepository userRepository;
  private final CourseRepository courseRepository;
  @Override
  public CustomUserDetails loadUserByUsername(String username) throws InvalidUsernameException {
    User user = userRepository.findByUsername(username);
    if (user == null) {
      throw new InvalidUsernameException("Invalid user credentials");
    }
    return new CustomUserDetails(user);
  }

  public Optional<User> getUserById(UUID id) {
    return userRepository.findById(id);
  }

  public User getCurrentUser() {
    SecurityContext securityContext = SecurityContextHolder.getContext();
    Authentication authentication = securityContext.getAuthentication();
    if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof CustomUserDetails) {
      UserDetails userDetails = (UserDetails) authentication.getPrincipal();
      User user = userRepository.findByUsername(userDetails.getUsername());
      return user;
    }
    return null;
  }

  public boolean checkCourseOwnership(User user, Course course) {
    Set<Course> courseList = user.getCourses();
    List<Course> filteredList = courseList.stream().filter(e->e.getId().equals(course.getId())).collect(Collectors.toList());
    return filteredList.size()==1;
  }


}
