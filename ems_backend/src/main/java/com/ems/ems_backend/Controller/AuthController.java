package com.ems.ems_backend.Controller;

import com.ems.ems_backend.Entity.Role;
import com.ems.ems_backend.Entity.User;
import com.ems.ems_backend.Security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtUtil jwtUtil;

    // In-memory users (username -> password)
//    private final Map<String, String> users = Map.of(
//            "admin", "admin123",
//            "dev", "dev123",
//            "hr", "hr123"
//    );

    private final Map<String, User> users = Map.of(
            "admin", new User("admin", "admin123", Role.ADMIN),
            "dev", new User("dev", "dev123", Role.DEV),
            "hr", new User("hr", "hr123", Role.HR)
    );

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User request) {

        User storedUser = users.get(request.getUsername());

        if (storedUser != null &&
                storedUser.getPassword().equals(request.getPassword())) {

            String token = jwtUtil.generateToken(storedUser);

            return Map.of(
                    "token", token,
                    "role", storedUser.getRole().name(),
                    "username", storedUser.getUsername()
            );
        }

        throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Invalid Credentials"
        );
    }
}