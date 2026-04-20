package com.ems.ems_backend.Entity;

import lombok.*;

@Data
public class User {

    private String username;
    private String password;
    private Role role;

    public User() {}

    public User(String username, String password, Role role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
}