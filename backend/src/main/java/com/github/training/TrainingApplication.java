package com.github.training;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Main Spring Boot class
 * TrainingApplication class is an entry point to application. It is responsible for launching the
 * Spring context and initializing the entire application.
 */
@SpringBootApplication
public class TrainingApplication {
    /**
     * Method responsible for launching the app.
     *
     * @param args array of type java.lang.String class that stores java command line arguments
     */
    public static void main(String[] args) {
        SpringApplication.run(TrainingApplication.class, args);
    }

    /**
    *   Configuration of bean responsible for encrypting passwords.
     * @return {@code new BCryptPasswordEncoder()}
    */
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
