package com.github.training.dto;

import com.github.training.user.User;
import lombok.Builder;

/**
 * UserDTO used to create JWT tokens.
 *
 * @param id - User id.
 * @param email - User email.
 */
@Builder
public record UserDTO(int id, String email) {
    public static UserDTO from(User user) {
        return builder()
                .id(user.getId())
                .email(user.getUsername())
                .build();
    }
}