package com.github.training.dog;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DogRepository extends JpaRepository<Dog, Integer> {
    @Query("SELECT d FROM Dog d " +
            "WHERE ( " +
            "    LOWER(d.name) LIKE LOWER(CONCAT('%', :searchBarData, '%')) " +
            "    OR LOWER(d.breed) LIKE LOWER(CONCAT('%', :searchBarData, '%')) " +
            "    OR LOWER(d.gender) LIKE LOWER(CONCAT('%', :searchBarData, '%')) " +
            "    OR LOWER(d.color) LIKE LOWER(CONCAT('%', :searchBarData, '%')) " +
            "    OR LOWER(d.collarColor) LIKE LOWER(CONCAT('%', :searchBarData, '%')) " +
            ") " +
            "AND (:age IS NULL OR :age < 1 OR d.age = :age) " +
            "AND (:breed IS NULL OR :breed = '' OR d.breed = :breed) " +
            "AND (:gender IS NULL OR :gender = '' OR d.gender = :gender) " +
            "AND (:color IS NULL OR :color = '' OR d.color = :color)")
    Page<Dog> findAllDogsPassingFilter(
            @Param("breed") String breed,
            @Param("gender") String gender,
            @Param("age") int age,
            @Param("color") String color,
            @Param("searchBarData") String searchBarData,
            Pageable pageable
    );
}
