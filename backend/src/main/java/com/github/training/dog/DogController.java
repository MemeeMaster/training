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

/**
 * RestController that handles requests to the REST API
 * with a URL base of /dogs
 */
@RestController
@AllArgsConstructor
@RequestMapping("/dogs")
public class DogController {
    /**
     * DogService component containing whole business logic of {@code Dog.class}
     */
    private DogService dogService;

    /**
     * Handles API request sent to URL "/sort/{field}/{direction}/page/{page}". Endpoint responsible
     * for sorting dog pages.
     *
     * @param direction - sorting direction. asc/desc/none
     * @param field - field by which the table is sorted.
     * @param page - required page of results.
     * @param filter - page filter containing result filtering details
     * @return {@code ResponseEntity<Page<Dog>>} containing page of dogs or {@code []} if empty.
     */
    @PostMapping("/sort/{field}/{direction}/page/{page}")
    public ResponseEntity<Page<Dog>> getDogPageSorted(@PathVariable String field,@PathVariable String direction, @PathVariable int page, @RequestBody FilterDTO filter){
        return dogService.getDogPageSorted(field, direction, page, filter);
    }

    /**
     * Generates PDF file for chosen dog entity.
     *
     * @param id - required dog's id.
     * @return generated PDF ready to handle on user interface side.
     */
    @GetMapping("/list/pdf/{id}")
    @Async
    public CompletableFuture<Void> generatePdf(HttpServletResponse response, @PathVariable int id) {
        dogService.generatePdf(response, id);
        return CompletableFuture.completedFuture(null);
    }

    /**
     * Fetches distinct dog breeds and colors from database.
     *
     * @return {@code ResponseEntity<OptionsDTO>} containing options results.
     */
    @GetMapping("/options")
    public ResponseEntity<OptionsDTO> getOptions() {
        return dogService.getOptions();
    }
}