package com.github.training.auth;

import com.github.training.jwt.JwtService;
import com.github.training.user.User;
import com.github.training.user.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final boolean SECURE;
    private final String PATH;
    private final int MAX_AGE;
    private final String DOMAIN;
    private final String SAME_SITE;

    public AuthService(UserRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager, @Value("${environment.secure}") boolean SECURE, @Value("${environment.path}") String PATH, @Value("${environment.age}") int MAX_AGE, @Value("${environment.domain}") String DOMAIN, @Value("${environment.same.site}") String SAME_SITE) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.SECURE = SECURE;
        this.PATH = PATH;
        this.MAX_AGE = MAX_AGE;
        this.DOMAIN = DOMAIN;
        this.SAME_SITE = SAME_SITE;
    }

    @Transactional
    public ResponseEntity<String> register(AuthRequest request) {
        User user = repository.findByEmail(request.getEmail()).orElse(null);

        if (user != null)
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User with this email already exists.");

        User newUser = new User(
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                User.Role.USER
        );
        repository.save(newUser);
        return new ResponseEntity<>("Account created.", HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<Object> authenticate(AuthRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);

        return ResponseEntity.ok(jwtToken);
    }

//    @Transactional
//    public ResponseEntity<Object> logout() {
//        ResponseCookie deleteJwtCookie = ResponseCookie.from("jwt-token", null)
//                .httpOnly(true)
//                .secure(SECURE)
//                .path(PATH)
//                .maxAge(-1)
//                .domain(DOMAIN)
//                .sameSite(SAME_SITE)
//                .build();
//
//        return ResponseEntity.ok(deleteJwtCookie);
//    }
}