package com.github.training.dog;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    public Dog(String name, String breed, String gender, int age, String color, String collarColor) {
        this.name = name;
        this.breed = breed;
        this.gender = gender;
        this.age = age;
        this.color = color;
        this.collarColor = collarColor;
    }
}
