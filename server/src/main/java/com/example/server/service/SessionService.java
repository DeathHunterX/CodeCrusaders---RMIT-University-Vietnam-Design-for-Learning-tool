package com.example.server.service;

import com.example.server.model.Session;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface SessionService {
  List<Session> getAllSession();
  Session getSessionById(Long id);

  Session createSession(Session session);
  void deleteSession(Long id);

  ResponseEntity<Session> updateSession(Session sessionInfo, Long id);
}

