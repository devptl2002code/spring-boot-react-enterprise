package com.ems.ems_backend.Controller;

import com.ems.ems_backend.Entity.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    public AuthController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User requestUser, HttpServletRequest request, HttpServletResponse response) {

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            requestUser.getUsername(),
                            requestUser.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Create session and save context
            HttpSession session = request.getSession(true);
            SecurityContextRepository contextRepository = new HttpSessionSecurityContextRepository();
            contextRepository.saveContext(SecurityContextHolder.getContext(), request, response);

            return Map.of(
                    "username", authentication.getName(),
                    "role", authentication.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "")
            );

        } catch (BadCredentialsException ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid Credentials");
        }
    }

    // ✅ LOGOUT
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request) {

        SecurityContextHolder.clearContext();

        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        return ResponseEntity.ok().build();
    }

    // ✅ CURRENT USER
    @GetMapping("/me")
    public Map<String, String> me(Authentication authentication) {
        return Map.of(
                "username", authentication.getName(),
                "role", authentication.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "")
        );
    }
}