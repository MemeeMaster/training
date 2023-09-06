package com.github.training.enums;

public enum Direction {
    ASC("asc"), DESC("desc");

    public final String label;

    Direction(String label) {
        this.label = label;
    }
}
