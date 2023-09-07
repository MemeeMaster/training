package com.github.training.dto;

import java.util.Set;

/**
 * OptionsDTO used to send options required within search block in the user interface.
 *
 * @param breeds - every distinct breed of dog found in database.
 * @param colors - every distinct color of dog found in database.
 */
public record OptionsDTO(Set<String> breeds, Set<String> colors) {
}