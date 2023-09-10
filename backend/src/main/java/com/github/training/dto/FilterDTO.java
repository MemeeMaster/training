package com.github.training.dto;

/**
 * FilterDTO representing data required to filter results from database.
 *
 * @param breed - required dog breed.
 * @param color - required dog color.
 * @param gender - required dog gender.
 * @param age - required dog age.
 * @param searchBarData - data from searchBar, used to check if this data is in any field in entity.
 */
public record FilterDTO(String breed, String color, String gender, int age, String searchBarData) {}
