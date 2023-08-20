package com.github.training.dto;

import com.github.training.user.User;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserDTO {
    private int id;
    private String email;

    public static UserDTO from(User user) {
        return builder()
                .id(user.getId())
                .email(user.getUsername())
                .build();
    }
}