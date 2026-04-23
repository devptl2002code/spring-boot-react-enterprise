package com.ems.ems_backend.Config;

import com.ems.ems_backend.Entity.Role;
import com.ems.ems_backend.Entity.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class UserConfig {

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder) {

        Map<String, User> users = new HashMap<>();

        users.put("admin", new User(1L, "admin", passwordEncoder.encode("admin"), Role.ADMIN));
        users.put("dev", new User(2L, "dev", passwordEncoder.encode("dev"), Role.DEV));
        users.put("hr", new User(3L, "hr", passwordEncoder.encode("hr"), Role.HR));
        users.put("user", new User(4L, "user", passwordEncoder.encode("user"), Role.USER));

        return username -> {
            User user = users.get(username);

            if (user == null) {
                throw new UsernameNotFoundException("User not found");
            }

            return org.springframework.security.core.userdetails.User
                    .withUsername(user.getUsername())
                    .password(user.getPassword())
                    .roles(user.getRole().name())
                    .build();
        };
    }
}