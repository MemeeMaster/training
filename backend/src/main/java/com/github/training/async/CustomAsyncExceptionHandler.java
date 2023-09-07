package com.github.training.async;

import lombok.NonNull;
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.lang.reflect.Method;
import java.util.Arrays;

/**
 * Custom exception handler that is handling async void method exceptions.
 */
public class CustomAsyncExceptionHandler implements AsyncUncaughtExceptionHandler {
    @Override
    public void handleUncaughtException(Throwable throwable, @NonNull Method method, Object @NonNull ... obj) {
        System.out.println("Exception message - " + throwable.getMessage() + Arrays.toString(throwable.getStackTrace()));
        System.out.println("Method name - " + method.getName());
        for (Object param : obj) {
            System.out.println("Parameter value - " + param);
        }

        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, throwable.getMessage());
    }
}
