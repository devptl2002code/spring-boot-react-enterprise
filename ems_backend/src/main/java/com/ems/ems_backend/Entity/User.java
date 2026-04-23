package com.ems.ems_backend.Entity;

import lombok.Getter;

public class User {

    private Long uid;
    @Getter
    private String username;
    @Getter
    private String password;
    @Getter
    private Role role;

    public User(Long uid, String username, String password, Role role) {
        this.uid = uid;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public User() {
    }

}