package com.github.training.security;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
@WebFilter("/*")
public class CorsFilter implements Filter {
    private String ALLOW_CREDENTIALS;
    private String ALLOWED_ORIGINS;
    private String MAX_AGE;

    public CorsFilter(@Value("${environment.allow.credentials}") String ALLOW_CREDENTIALS, @Value("${environment.allow.origins}") String ALLOWED_ORIGINS, @Value("${environment.max.age}") String MAX_AGE) {
        this.ALLOW_CREDENTIALS = ALLOW_CREDENTIALS;
        this.ALLOWED_ORIGINS = ALLOWED_ORIGINS;
        this.MAX_AGE = MAX_AGE;
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) resp;
        HttpServletRequest request = (HttpServletRequest) req;
        response.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGINS);
        response.setHeader("Access-Control-Allow-Credentials", ALLOW_CREDENTIALS);
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        response.setHeader("Access-Control-Max-Age", MAX_AGE);
        response
                .setHeader("Access-Control-Allow-Headers", "Origin, origin, x-requested-with, authorization, " +
                        "Content-Type, Authorization, credential, X-XSRF-TOKEN");

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            chain.doFilter(req, resp);
        }
    }
}
