package com.github.training.dog;

import com.github.training.dto.FilterDTO;
import com.github.training.dto.OptionsDTO;
import com.github.training.enums.Direction;
import com.github.training.pdf.PDFGenerator;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Set;

@Service
@AllArgsConstructor
public class DogService {
    private DogRepository dogRepository;

    public ResponseEntity<Page<Dog>> getDogsPageFiltered(int page, FilterDTO filter) {
        Pageable requestedPage = PageRequest.of(page - 1, 20);
        return ResponseEntity.ok(dogRepository.findAllDogsPassingFilter(filter.breed(), filter.gender(), filter.age(), filter.color(), filter.searchBarData(), requestedPage));
    }

    public ResponseEntity<Page<Dog>> getDogsPageFiltered(FilterDTO filter, Pageable requestedPage) {
        return ResponseEntity.ok(dogRepository.findAllDogsPassingFilter(filter.breed(), filter.gender(), filter.age(), filter.color(), filter.searchBarData(), requestedPage));
    }

    public void generatePdf(HttpServletResponse response, int id) {
        Dog dog = dogRepository.findById(id).orElse(null);

        if (dog == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Selected dog doesn't exist.");

        response.setContentType("application/pdf");
        PDFGenerator generator = new PDFGenerator(dog);
        generator.generatePdf(response);
    }

    public ResponseEntity<OptionsDTO> getOptions() {
        Set<String> breeds = dogRepository.findDistinctBreeds();
        Set<String> colors = dogRepository.findDistinctColors();
        return ResponseEntity.ok(new OptionsDTO(breeds, colors));
    }

    public ResponseEntity<Page<Dog>> getDogPageSorted(String field, String direction, int page, FilterDTO filter) {
        if (!direction.equals(Direction.ASC.label) && !direction.equals(Direction.DESC.label))
            return getDogsPageFiltered(page, filter);

        Pageable requestedPage;
        if (direction.equals(Direction.ASC.label)) requestedPage = PageRequest.of(page - 1, 20, Sort.by(field).ascending());
        else requestedPage = PageRequest.of(page - 1, 20, Sort.by(field).descending());

        return getDogsPageFiltered(filter, requestedPage);
    }
}
