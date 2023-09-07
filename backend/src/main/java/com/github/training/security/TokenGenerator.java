package com.github.training.security;

import com.github.training.dto.TokenDTO;
import com.github.training.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Component;

import java.text.MessageFormat;
import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

/**
 * TokenGenerator component containing logic used to generate JWT access tokens
 * and refresh tokens
 */
@Component
public class TokenGenerator {
    @Autowired
    JwtEncoder accessTokenEncoder;
    @Autowired
    @Qualifier("jwtRefreshTokenEncoder")
    JwtEncoder refreshTokenEncoder;
    private final int JWT_EXPIRATION;
    private final int REFRESH_EXPIRATION;
    private final String ISSUER;
    private final String AUDIENCE;

    /**
     * Creates new TokenGenerator object / defines required fields.
     *
     * @param accessTokenEncoder - encodes access tokens.
     * @param refreshTokenEncoder - encodes refresh tokens.
     * @param JWT_EXPIRATION - JWT access token expiration days.
     * @param REFRESH_EXPIRATION - JWT refresh token expiration days.
     * @param ISSUER - token issuer.
     * @param AUDIENCE - token audience.
     */
    public TokenGenerator(JwtEncoder accessTokenEncoder, JwtEncoder refreshTokenEncoder, @Value("${environment.jwt.expiration}") int JWT_EXPIRATION, @Value("${environment.jwt.refresh-expiration}") int REFRESH_EXPIRATION, @Value("${environment.issuer}") String ISSUER, @Value("${environment.audience}") String AUDIENCE) {
        this.accessTokenEncoder = accessTokenEncoder;
        this.refreshTokenEncoder = refreshTokenEncoder;
        this.JWT_EXPIRATION = JWT_EXPIRATION;
        this.REFRESH_EXPIRATION = REFRESH_EXPIRATION;
        this.ISSUER = ISSUER;
        this.AUDIENCE = AUDIENCE;
    }

    private String createAccessToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Instant now = Instant.now();

        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer(ISSUER)
                .audience(List.of(AUDIENCE))
                .issuedAt(now)
                .expiresAt(now.plus(JWT_EXPIRATION, ChronoUnit.MINUTES))
                .subject(String.valueOf(user.getId()))
                .build();

        return accessTokenEncoder.encode(JwtEncoderParameters.from(claimsSet)).getTokenValue();
    }

    private String createRefreshToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Instant now = Instant.now();

        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer(ISSUER)
                .audience(List.of(AUDIENCE))
                .issuedAt(now)
                .expiresAt(now.plus(REFRESH_EXPIRATION, ChronoUnit.DAYS))
                .subject(String.valueOf(user.getId()))
                .build();

        return refreshTokenEncoder.encode(JwtEncoderParameters.from(claimsSet)).getTokenValue();
    }


    /**
     * Creates new {@code TokenDTO} ready to be sent to user in response.
     * In more detail, it is checking if {@code refreshToken} is about to expire in 7 days.
     * If it is, then it is going to refresh it, or not if it is not close to expiration.
     *
     * @param authentication - object containing authentication details.
     * @return {@code new TokenDTO(userId, accessToken, refreshToken)} - TokenDTO with correct tokens.
     */
    public TokenDTO createToken(Authentication authentication) {
        if (!(authentication.getPrincipal() instanceof User user)) {
            throw new BadCredentialsException(
                    MessageFormat.format("principal {0} is not of User type", authentication.getPrincipal().getClass())
            );
        }

        int userId = user.getId();
        String accessToken = createAccessToken(authentication);

        String refreshToken;
        if (authentication.getCredentials() instanceof Jwt jwt) {
            Instant now = Instant.now();
            Instant expiresAt = jwt.getExpiresAt();
            Duration duration = Duration.between(now, expiresAt);
            long daysUntilExpired = duration.toDays();

            if (daysUntilExpired < 7) refreshToken = createRefreshToken(authentication);
            else refreshToken = jwt.getTokenValue();

        } else refreshToken = createRefreshToken(authentication);

        return new TokenDTO(userId, accessToken, refreshToken);
    }
}