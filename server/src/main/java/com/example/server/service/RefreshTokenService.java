package com.example.server.service;

import com.example.server.model.RefreshToken;

import java.util.Optional;
import java.util.UUID;

public interface RefreshTokenService {
  Optional<RefreshToken> findByToken(String token);
  RefreshToken createRefreshToken(UUID userId);
  RefreshToken verifyExpirationDate(RefreshToken refreshToken);

}
