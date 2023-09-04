package com.github.training.dog;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CompletableFuture;

@RestController
@AllArgsConstructor
@RequestMapping("/dogs")
public class DogController {
    private DogService dogService;

    @GetMapping("/list/page/{page}")
    public ResponseEntity<Page<Dog>> getDogsPage(@PathVariable int page) {
        return dogService.getDogsPage(page);
    }

    @GetMapping("/list/{id}/pdf")
    @Async
    public CompletableFuture<Void> generatePdf(HttpServletResponse response, @PathVariable int id) {
        dogService.generatePdf(response, id);
        return CompletableFuture.completedFuture(null);
    }
}
