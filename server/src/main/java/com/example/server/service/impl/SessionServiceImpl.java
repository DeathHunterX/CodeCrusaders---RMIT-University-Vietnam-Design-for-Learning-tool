package com.example.server.service.impl;

import com.example.server.api.response.SessionResponse;
import com.example.server.exception.ObjectNotFoundException;
import com.example.server.model.Module;
import com.example.server.model.Session;
import com.example.server.repository.SessionRepository;
import com.example.server.service.SessionService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SessionServiceImpl implements SessionService {
  private final SessionRepository sessionRepository;
  private final ModelMapper modelMapper;
  @Override
  public List<Session> getAllSession() {
    return sessionRepository.findAll();
  }

  @Override
  public Session getSessionById(UUID id) {
    return sessionRepository.findById(id)
            .orElseThrow(()-> new ObjectNotFoundException("Session", "id",404));
  }

  @Override
  public Session createSession(Session session) {
    return sessionRepository.save(session);
  }

  @Override
  public void deleteSession(UUID id) {
    sessionRepository.deleteById(id);

  }

  @Override
  public ResponseEntity<?> updateSessionInfo(Session sessionInfo, UUID id) {
    Optional<Session> sessionData = sessionRepository.findById(id);
    if (sessionData.isPresent()) {
      Session _session = sessionData.get();
      _session.setSessionOption(sessionInfo.getSessionOption());
      _session.setSessionType(sessionInfo.getSessionType());
      _session.setHasLecturer(sessionInfo.getHasLecturer());
//      _session.setActivityList(sessionInfo.getActivityList());
      Session savedSession = sessionRepository.save(_session);
      return new ResponseEntity<>(modelMapper.map(savedSession, SessionResponse.class), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}
