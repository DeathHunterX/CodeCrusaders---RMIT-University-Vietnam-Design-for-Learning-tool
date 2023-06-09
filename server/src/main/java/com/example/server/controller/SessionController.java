package com.example.server.controller;

import com.example.server.model.Session;
import com.example.server.service.SessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("v1/api/session")
@RequiredArgsConstructor
public class SessionController {
  private final SessionService sessionService;

  @GetMapping("/all-sessions")
  public List<Session> getAllSessions() {
    return sessionService.getAllSession();
  }

  @GetMapping("/{id}")
  public Optional<Session> getSessionById(@PathVariable("id") Long id) {
    return sessionService.getSessionById(id);
  }

  @PostMapping("/create-session")
  public ResponseEntity<Session> createSession(@RequestBody Session session) {
    return ResponseEntity.ok(sessionService.createSession(session));
  }

  @PutMapping("/update-session/{id}")
  public ResponseEntity<Session> updateSession(@PathVariable("id") Long id, @RequestBody Session sessionInfo) {
    return sessionService.updateSession(sessionInfo,id);
  }

  @DeleteMapping("/delete-session/{id}")
  public String deleteSession(@PathVariable("id") Long id) {
    sessionService.deleteSession(id);
    return "";
  }
}
