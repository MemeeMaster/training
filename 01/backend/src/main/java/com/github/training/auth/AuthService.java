package com.github.training.auth;

import com.github.training.jwt.JwtService;
import com.github.training.user.User;
import com.github.training.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public ResponseEntity<String> register(AuthRequest request) {
        User user = repository.findByEmail(request.getEmail()).orElse(null);

        if (user == null) {
            User newUser = new User(
                    request.getEmail(),
                    passwordEncoder.encode(request.getPassword()),
                    User.Role.USER
            );
            repository.save(newUser);
            return new ResponseEntity<>("Account created.", HttpStatus.OK);
        }
        throw new ResponseStatusException(HttpStatus.CONFLICT, "User with this email already exists.");
    }

    @Transactional
    public ResponseEntity<Object> authenticate(AuthRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);

        ResponseCookie jwtCookie = ResponseCookie.from("jwt-token", jwtToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(1200)
                .domain("localhost")
                .sameSite("strict")
                .build();

        ResponseCookie isJwtPresentCookie = ResponseCookie.from("jwt-present", "present")
                .path("/")
                .maxAge(1200)
                .domain("localhost")
                .sameSite("strict")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .header(HttpHeaders.SET_COOKIE, isJwtPresentCookie.toString())
                .build();
    }
}
