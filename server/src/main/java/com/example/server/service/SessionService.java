package com.example.server.service;

import com.example.server.api.request.SessionUpdateRequest;
import com.example.server.model.Session;
import com.example.server.model.enums.SessionType;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

public interface SessionService {
  List<Session> getAllSession();
  Session getSessionById(UUID id);

  void updateSession(Session session);

  Session createSession(Session session);
  void deleteSession(UUID id);

  ResponseEntity<?> updateSessionInfo(Session sessionInfo, UUID id);

  void updateSessionBySessionType(List<SessionUpdateRequest> sessionUpdateRequests, List<Session> oldModuleList, SessionType sessionType);

}

