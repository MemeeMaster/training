package com.github.training.dto;

import com.github.training.user.User;
import lombok.Builder;

@Builder
public record UserDTO(int id, String email) {
    public static UserDTO from(User user) {
        return builder()
                .id(user.getId())
                .email(user.getUsername())
                .build();
    }
}