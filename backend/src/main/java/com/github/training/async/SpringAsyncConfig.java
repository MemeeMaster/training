package com.github.training.async;

import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

/**
 * Spring async configuration class.
 */
@Configuration
@EnableAsync
public class SpringAsyncConfig implements AsyncConfigurer {
    /**
     * Provides app with custom executor that will handle async tasks in application.
     *
     * @return {@code ThreadPoolTaskExecutor}
     */
    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor threadPoolTaskExecutor = new ThreadPoolTaskExecutor();
        threadPoolTaskExecutor.initialize();
        return threadPoolTaskExecutor;
    }

    /**
     * Sets exception handler to CustomAsyncExceptionHandler.
     *
     * @return {@code new CustomAsyncExceptionHandler()}
     */
    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return new CustomAsyncExceptionHandler();
    }
}
