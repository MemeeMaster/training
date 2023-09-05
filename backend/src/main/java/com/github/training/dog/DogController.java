package com.github.training.dog;

import com.github.training.dto.FilterDTO;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

@RestController
@AllArgsConstructor
@RequestMapping("/dogs")
public class DogController {
    private DogService dogService;

    @PostMapping("/list/page/{page}")
    public ResponseEntity<Page<Dog>> getDogsPageFiltered(@PathVariable int page, @RequestBody FilterDTO filter) {
        System.out.println(page);
        System.out.println(filter.toString());
        return dogService.getDogsPageFiltered(page, filter);
    }

    @GetMapping("/list/pdf/{id}")
    @Async
    public CompletableFuture<Void> generatePdf(HttpServletResponse response, @PathVariable int id) {
        dogService.generatePdf(response, id);
        return CompletableFuture.completedFuture(null);
    }
}