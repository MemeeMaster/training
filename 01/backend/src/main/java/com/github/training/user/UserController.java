package com.github.training.user;

import com.github.training.dto.UserDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    UserRepository userRepository;

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> user(@PathVariable int id) {
        return ResponseEntity.ok(UserDTO.from(userRepository.findById(id).orElseThrow()));
    }
}
