package com.github.training.user;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;

@Service
@AllArgsConstructor
public class UserService {
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    public void createUser(UserDetails user) {
        ((User) user).setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save((User) user);
    }

    public boolean userExists(String username) {
        return userRepository.existsByEmail(username);
    }

    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(
                        MessageFormat.format("username {0} not found", email)
                ));
    }
}
