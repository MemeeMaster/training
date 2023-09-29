package com.github.training.dto;

/**
 * TokenDTO representing API response to user after successful authentication.
 *
 * @param username - username of User that is trying to authenticate/register.
 * @param accessToken - JWT access token.
 */
public record TokenDTO(String username, String accessToken) {}