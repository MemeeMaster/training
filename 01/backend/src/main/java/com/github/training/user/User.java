package com.github.training.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Entity
@NoArgsConstructor
@Setter
@Getter
@Table(name = "users")
public class User implements UserDetails {
    @Setter(AccessLevel.NONE)
    @Id
    @GeneratedValue
    private int id;
    @Email
    private String email;
    private String password;
    private LocalDate passwordExpiration;
    @Enumerated(EnumType.STRING)
    private Role role;
    private boolean expired;
    private boolean locked;
    private boolean enabled;
    @Transient
    private int passwordExp = 30;

    public User(String email, String password, Role role, boolean expired, boolean locked, boolean enabled) {
        this.email = email;
        this.password = password;
        this.passwordExpiration = LocalDate.now().plusDays(passwordExp);
        this.role = role;
        this.expired = expired;
        this.locked = locked;
        this.enabled = enabled;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return !expired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return passwordExpiration.isAfter(LocalDate.now());
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public enum Role {
        USER, ADMIN
    }
}