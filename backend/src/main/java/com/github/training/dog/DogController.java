package com.github.training.dog;

import com.github.training.dto.FilterDTO;
import com.github.training.dto.OptionsDTO;
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
        return dogService.getDogsPageFiltered(page, filter);
    }

    @GetMapping("/list/pdf/{id}")
    @Async
    public CompletableFuture<Void> generatePdf(HttpServletResponse response, @PathVariable int id) {
        dogService.generatePdf(response, id);
        return CompletableFuture.completedFuture(null);
    }

    @GetMapping("/options")
    public ResponseEntity<OptionsDTO> getOptions() {
        return dogService.getOptions();
    }
}