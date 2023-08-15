package com.github.training.user;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    public ResponseEntity<String> test() {
        return ResponseEntity.ok("test - ok");
    }
}
