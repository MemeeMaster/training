package com.github.training.auth;

import com.github.training.jwt.JwtService;
import com.github.training.user.User;
import com.github.training.user.UserRepository;
import jakarta.transaction.Transactional;
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

    public AuthService(UserRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Transactional
    public ResponseEntity<String> register(AuthRequest request) {
        User user = repository.findByEmail(request.getEmail()).orElse(null);

        if (user != null)
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User with this email already exists.");

        User newUser = new User(
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                User.Role.USER,
                false,
                false,
                true
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
}