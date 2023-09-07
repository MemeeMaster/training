package com.github.training.dog;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.SortedSet;

/**
 * Repository for {@code Dog} entity.
 */
@Repository
public interface DogRepository extends JpaRepository<Dog, Integer> {
    /**
     * Returns results that are matching the filters. This is checking if
     * entity has correct breed, gender, age, color and collarColor and then
     * checks if searchBarData is included in any of those fields.
     * This method is not case-sensitive and is passing entity if filter is null
     * or empty ('').
     *
     * @param breed - requested breed.
     * @param gender - requested gender.
     * @param age - requested age.
     * @param color - requested color.
     * @param searchBarData - data from search bar.
     * @param pageable - page filter details.
     * @return {@code Page<Dog>} - dogs that match the criteria.
     */
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

    /**
     * Fetches all distinct dog breeds from database.
     * @return {@code SortedSet<String>} containing Dog breeds.
     */
    @Query("SELECT DISTINCT d.breed FROM Dog d")
    SortedSet<String> findDistinctBreeds();

    /**
     * Fetches all distinct dog colors from database.
     * @return {@code SortedSet<String>} containing Dog colors.
     */
    @Query("SELECT DISTINCT d.color FROM Dog d")
    SortedSet<String> findDistinctColors();
}
