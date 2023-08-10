package com.example.server.service.impl;

import com.example.server.exception.ObjectNotFoundException;
import com.example.server.exception.TokenRefreshException;
import com.example.server.model.RefreshToken;
import com.example.server.model.User;
import com.example.server.repository.RefreshTokenRepository;
import com.example.server.repository.UserRepository;
import com.example.server.service.RefreshTokenService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {
  private final RefreshTokenRepository refreshTokenRepository;
  private final UserRepository userRepository;
  private final UserDetailsServiceImpl userDetailsService;

  @Value("${codecrusaders.app.refreshTokenExpirationMs}")
  private Long refreshTokenDurationMs;

  @Override
  public Optional<RefreshToken> findByToken(String token) {
    return refreshTokenRepository.findRefreshTokenByToken(token);
  }

  @Override
  @Transactional
  public RefreshToken createRefreshToken(UUID userId) {
    User user = userDetailsService.getUserById(userId).orElseThrow(() -> new ObjectNotFoundException("User", "id"));
    RefreshToken refreshToken = new RefreshToken();
    refreshToken.setToken(UUID.randomUUID().toString());
    refreshToken.setExpireDate(Instant.now().plusMillis(refreshTokenDurationMs));
    refreshToken.setUser(user);
    user.setRefreshToken(refreshToken);
    refreshTokenRepository.save(refreshToken);
    return refreshToken;
  }

  @Override
  public RefreshToken verifyExpirationDate(RefreshToken refreshToken) {
    if (refreshToken.getExpireDate().compareTo(Instant.now()) < 0) {
      refreshTokenRepository.delete(refreshToken);
      throw new TokenRefreshException(refreshToken.getToken(), "Refresh token was expired. Please sign in again");
    }
    return refreshToken;
  }
}
