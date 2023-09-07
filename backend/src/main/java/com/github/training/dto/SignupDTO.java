package com.github.training.dto;

/**
 * SignupDTO representing data required to register successfully.
 * @param email passed as user's login
 * @param password user's password
 */
public record SignupDTO(String email, String password) {}
