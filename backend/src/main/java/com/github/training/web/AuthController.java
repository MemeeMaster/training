package com.github.training.web;

import com.github.training.dto.LoginDTO;
import com.github.training.dto.SignupDTO;
import com.github.training.dto.TokenDTO;
import com.github.training.enums.Role;
import com.github.training.security.TokenGenerator;
import com.github.training.user.User;
import com.github.training.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationProvider;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * RestController that handles requests to the REST API
 * with a URL base of /api/auth
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    /**
     * UserService component containing whole business logic of {@code User.class}
     */
    @Autowired
    UserService userService;
    /**
     * TokenGenerator component containing logic used to generate JWT access tokens
     * and refresh tokens
     */
    @Autowired
    TokenGenerator tokenGenerator;
    /**
     * DaoAuthenticationProvider component used to authenticate users
     * based on information stored in the database.
     */
    @Autowired
    DaoAuthenticationProvider daoAuthenticationProvider;
    /**
     * JwtAuthenticationProvider component used to authenticate users
     * based on information stored in the JWT token.
     * This component is able to read token details and JWT signature.
     */
    @Autowired
    @Qualifier("jwtRefreshTokenAuthProvider")
    JwtAuthenticationProvider refreshTokenAuthProvider;

    /**
     * Handles API request sent to URL "/api/auth/register". Endpoint responsible
     * for registration of new  users.
     *
     * @param signupDTO DTO object containing required data to register successfully. {@code String email, String password}
     * @return {@code ResponseEntity.ok(generatedTokens)} if authentication is successful.
     */
    @PostMapping("/register")
    public ResponseEntity<TokenDTO> register(@RequestBody SignupDTO signupDTO) {
        User user = new User(signupDTO.email(), signupDTO.password(), Role.USER, false, false, true);
        userService.createUser(user);
        Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(user, signupDTO.password(), List.of());

        return tokenGenerator.createToken(authentication);
    }

    /**
     * Handles API request sent to URL "/api/auth/login". Endpoint responsible
     * for user login.
     *
     * @param loginDTO DTO object containing required data to login successfully. {@code String email, String password}
     * @return {@code ResponseEntity.ok(generatedTokens)} if authentication is successful.
     */
    @PostMapping("/login")
    public ResponseEntity<TokenDTO> login(@RequestBody LoginDTO loginDTO) {
        Authentication authentication = daoAuthenticationProvider.authenticate(UsernamePasswordAuthenticationToken.unauthenticated(loginDTO.email(), loginDTO.password()));

        return tokenGenerator.createToken(authentication);
    }

    @PostMapping("/logout")
    public ResponseEntity<Object> logout() {
        return tokenGenerator.destroyToken();
    }

    /**
     * Handles API request sent to URL "/api/auth/token". Endpoint responsible
     * for refreshing JWT token if required.
     *
     * @param refreshToken - token obtained from a cookie.
     * @return {@code ResponseEntity.ok(generatedTokens)} if authentication is successful.
     */
    @PostMapping("/token")
    public ResponseEntity<TokenDTO> token(@CookieValue(name = "refresh-token") String refreshToken) {
        Authentication authentication = refreshTokenAuthProvider.authenticate(new BearerTokenAuthenticationToken(refreshToken));
        Jwt jwt = (Jwt) authentication.getCredentials();

        return tokenGenerator.createToken(authentication);
    }
}
