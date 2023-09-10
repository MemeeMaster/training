package com.github.training.dog;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Dog class containing structure of dog passed to database.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "dogs")
public class Dog {
    @Setter(AccessLevel.NONE)
    @Id
    @GeneratedValue
    private int id;
    private String name;
    private String breed;
    private String gender;
    private int age;
    private String color;
    private String collarColor;

    /**
     * Creates new {@code Dog} object
     *
     * @param name - dog's name.
     * @param breed - dog's breed.
     * @param gender - dog's gender.
     * @param age - dog's age.
     * @param color - dog's color.
     * @param collarColor - dog's collar color.
     */
    public Dog(String name, String breed, String gender, int age, String color, String collarColor) {
        this.name = name;
        this.breed = breed;
        this.gender = gender;
        this.age = age;
        this.color = color;
        this.collarColor = collarColor;
    }
}
