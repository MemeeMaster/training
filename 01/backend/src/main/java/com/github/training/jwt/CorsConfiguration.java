package com.github.training.jwt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfiguration implements WebMvcConfigurer {
    private String PATH_PATTERN;
    private boolean ALLOW_CREDENTIALS;
    private String ALLOWED_ORIGINS;
    private int CORS_MAX_AGE;

    public CorsConfiguration(@Value("${environment.path.pattern}") String PATH_PATTERN, @Value("${environment.credentials}") boolean ALLOW_CREDENTIALS, @Value("${environment.origins}") String ALLOWED_ORIGINS, @Value("${environment.cors.age}") int CORS_MAX_AGE) {
        this.PATH_PATTERN = PATH_PATTERN;
        this.ALLOW_CREDENTIALS = ALLOW_CREDENTIALS;
        this.ALLOWED_ORIGINS = ALLOWED_ORIGINS;
        this.CORS_MAX_AGE = CORS_MAX_AGE;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping(PATH_PATTERN)
                .allowCredentials(ALLOW_CREDENTIALS)
                .allowedOrigins(ALLOWED_ORIGINS)
                .allowedMethods("GET", "POST")
                .allowedHeaders("Host", "Content-Type", "Content-Length", "Authorization")
                .maxAge(CORS_MAX_AGE);
    }
}