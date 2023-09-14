package com.example.server.service.impl;

import com.example.server.api.request.SessionDurationRequest;
import com.example.server.api.request.SessionUpdateRequest;
import com.example.server.api.response.ApiResponse;
import com.example.server.api.response.SessionResponse;
import com.example.server.exception.ObjectNotFoundException;
import com.example.server.model.Activity;
import com.example.server.model.Module;
import com.example.server.model.Session;
import com.example.server.model.enums.SessionName;
import com.example.server.repository.SessionRepository;
import com.example.server.service.ModuleService;
import com.example.server.service.SessionService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SessionServiceImpl implements SessionService {
  private final SessionRepository sessionRepository;
  private final ModuleService moduleService;
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
  public void updateSession(Session session) {
    sessionRepository.save(session);
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
  public ResponseEntity<?> updateTotalDuration(UUID moduleId, UUID sessionId, SessionDurationRequest sessionDurationRequest) {
    Module module = moduleService.getModuleById(moduleId);
    if(!(module.getSessionList().stream().anyMatch(e->e.getId().equals(sessionId)))){
      return new ResponseEntity<>(new ApiResponse("No session found with this module"), HttpStatus.BAD_REQUEST);
    }
    Session session = getSessionById(sessionId);
    session.setTotalDuration(sessionDurationRequest.getTotalDuration());
    Session savedSession = sessionRepository.save(session);
    return new ResponseEntity<>(savedSession,HttpStatus.OK);
  }

  @Override
  public ResponseEntity<?> updateSessionInfo(Session sessionInfo, UUID id) {
    Optional<Session> sessionData = sessionRepository.findById(id);
    if (sessionData.isPresent()) {
      Session _session = sessionData.get();
      _session.setSessionOption(sessionInfo.getSessionOption());
      _session.setSessionName(sessionInfo.getSessionName());
      _session.setHasLecturer(sessionInfo.getHasLecturer());
      Session savedSession = sessionRepository.save(_session);
      return new ResponseEntity<>(modelMapper.map(savedSession, SessionResponse.class), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @Override
  public void updateSessionBySessionType(List<SessionUpdateRequest> sessionUpdateRequests, List<Session> oldModuleList, SessionName sessionName) {
    List<SessionUpdateRequest> filteredSessions = sessionUpdateRequests.stream()
            .filter(e->e.getSessionName().equals(sessionName))
            .collect(Collectors.toList());
    List<Session> filteredOldSessions = oldModuleList.stream()
            .filter(e->e.getSessionName().equals(sessionName))
            .collect(Collectors.toList());
    SessionUpdateRequest sessionUpdateRequest = filteredSessions.get(0);
    Session session = filteredOldSessions.get(0);
    session.setHasLecturer(sessionUpdateRequest.getHasLecturer());
    session.setSessionOption(sessionUpdateRequest.getSessionOption());
    session.setGroupingType(sessionUpdateRequest.getGroupingType());
    session.setInteractionType(sessionUpdateRequest.getInteractionType());
    sessionRepository.save(session);
  }
}
