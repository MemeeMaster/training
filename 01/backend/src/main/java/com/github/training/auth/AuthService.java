package com.github.training.auth;

import com.github.training.jwt.JwtService;
import com.github.training.user.User;
import com.github.training.user.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
            return new ResponseEntity<>("An account with this e-mail already exists.", HttpStatus.CONFLICT);

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
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            User user = repository.findByEmail(request.getEmail()).orElse(null);

            if(user == null)
                return new ResponseEntity<>("Account doesn't exist.", HttpStatus.NOT_FOUND);

            String jwtToken = jwtService.generateToken(user);
            return ResponseEntity.ok(jwtToken);
        } catch (AuthenticationException exception){
            return new ResponseEntity<>("Wrong credentials.", HttpStatus.UNAUTHORIZED);
        }
    }
}