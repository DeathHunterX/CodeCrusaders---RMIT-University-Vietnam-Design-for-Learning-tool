package com.example.server.service;

import com.example.server.model.Session;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SessionService {
  List<Session> getAllSession();
  Session getSessionById(UUID id);

  Session createSession(Session session);
  void deleteSession(UUID id);

  ResponseEntity<?> updateSessionInfo(Session sessionInfo, UUID id);
}

