package com.github.training.dto;

/**
 * LoginDTO representing data required to login successfully.
 * @param email passed as user's login
 * @param password user's password
 */
public record LoginDTO(String email, String password) {}