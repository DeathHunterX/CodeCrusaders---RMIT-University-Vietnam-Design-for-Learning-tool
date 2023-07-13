package com.example.server.service.impl;

import com.example.server.exception.ObjectNotFoundException;
import com.example.server.model.Module;
import com.example.server.model.Session;
import com.example.server.repository.SessionRepository;
import com.example.server.service.SessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SessionServiceImpl implements SessionService {
  private final SessionRepository sessionRepository;
  @Override
  public List<Session> getAllSession() {
    return sessionRepository.findAll();
  }

  @Override
  public Session getSessionById(Long id) {
    return sessionRepository.findById(id)
            .orElseThrow(()-> new ObjectNotFoundException("Session", "id"));
  }

  @Override
  public Session createSession(Session session) {
    return sessionRepository.save(session);
  }

  @Override
  public void deleteSession(Long id) {
    sessionRepository.deleteById(id);

  }

  @Override
  public ResponseEntity<Session> updateSession(Session sessionInfo, Long id) {
    Optional<Session> sessionData = sessionRepository.findById(id);
    if (sessionData.isPresent()) {
      Session _session = sessionData.get();
      _session.setActivityList(sessionInfo.getActivityList());
      return new ResponseEntity<>(sessionRepository.save(_session), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}
