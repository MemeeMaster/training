package com.github.training.dog;

import com.github.training.dto.FilterDTO;
import com.github.training.pdf.PDFGenerator;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class DogService {
    private DogRepository dogRepository;

    public ResponseEntity<Page<Dog>> getDogsPageFiltered(int page, FilterDTO filter) {
        Pageable requestedPage = PageRequest.of(page - 1, 20);
        return ResponseEntity.ok(dogRepository.findAllDogsPassingFilter(filter.breed(), filter.gender(), filter.age(), filter.color(), filter.searchBarData(), requestedPage));
    }

    public void generatePdf(HttpServletResponse response, int id) {
        Dog dog = dogRepository.findById(id).orElse(null);

        if (dog == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Selected dog doesn't exist.");

        response.setContentType("application/pdf");
        PDFGenerator generator = new PDFGenerator(dog);
        generator.generatePdf(response);
    }
}
