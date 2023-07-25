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
import java.util.UUID;

@RestController
@RequestMapping("v1/api")
@RequiredArgsConstructor
public class SessionController {
  private final SessionService sessionService;

  @GetMapping("sessions")
  public List<Session> getAllSessions() {
    return sessionService.getAllSession();
  }

  @GetMapping("sessions/{id}")
  public Session getSessionById(@PathVariable("id") UUID id) {
    return sessionService.getSessionById(id);
  }

  @PostMapping("sessions/create-session")
  public ResponseEntity<Session> createSession(@RequestBody Session session) {
    return ResponseEntity.ok(sessionService.createSession(session));
  }

  @PutMapping("sessions/update-session/{id}")
  public ResponseEntity<?> updateSession(@PathVariable("id") UUID id, @RequestBody Session sessionInfo) {
    return sessionService.updateSessionInfo(sessionInfo,id);
  }

  @DeleteMapping("sessions/delete-session/{id}")
  public String deleteSession(@PathVariable("id") UUID id) {
    sessionService.deleteSession(id);
    return "";
  }
}
