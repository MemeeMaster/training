package com.github.training.user;

import com.github.training.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

/**
 * User class containing structure of user passed to database.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
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

    /**
     * Creates new User object.
     *
     * @param email    User's email address.
     * @param password User's password.
     * @param role     User's role in system.
     * @param expired  Has the user account expired.
     * @param locked   Has the user account been blocked.
     * @param enabled  Has the user account been closed.
     */
    public User(String email, String password, Role role, boolean expired, boolean locked, boolean enabled) {
        this.email = email;
        this.password = password;
        this.passwordExpiration = LocalDate.now().plusDays(passwordExp);
        this.role = role;
        this.expired = expired;
        this.locked = locked;
        this.enabled = enabled;
    }

    /**
     * Returns roles attached to user. By default, it is only USER role.
     * @return list of user roles.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    /**
     * Returns identifier by which the user is logged in.
     * @return email of this User.
     */
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
}