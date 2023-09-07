package com.github.training.dto;

/**
 * TokenDTO representing API response to user after successful authentication.
 *
 * @param userId - id of User that is trying to authenticate/register.
 * @param accessToken - JWT access token.
 * @param refreshToken - JWT refresh token.
 */
public record TokenDTO(int userId, String accessToken, String refreshToken) {}