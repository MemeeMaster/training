package com.github.training.auth;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest {
    private String email;
    private String password;
}