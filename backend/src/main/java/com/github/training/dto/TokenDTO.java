package com.github.training.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class TokenDTO {
    private int userId;
    private String accessToken;
    private String refreshToken;
}