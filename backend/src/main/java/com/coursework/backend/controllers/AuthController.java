package com.coursework.backend.controllers;

import com.coursework.backend.dto.LoginRequest;
import com.coursework.backend.dto.RegisterRequest;
import com.coursework.backend.dto.LoginResponse;
import com.coursework.backend.models.User;
import com.coursework.backend.services.AuthService;
import com.coursework.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@Valid @RequestBody RegisterRequest request) {
        User user = authService.register(request);
        String token = jwtUtil.generateToken(user.getId(), user.getEmail());

        return ResponseEntity.ok(new LoginResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                token
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        User user = authService.login(request);
        String token = jwtUtil.generateToken(user.getId(), user.getEmail());

        return ResponseEntity.ok(new LoginResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                token
        ));
    }

    @GetMapping("/verify")
    public ResponseEntity<LoginResponse> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().build();
        }

        String token = authHeader.substring(7); // Видаляємо "Bearer "
        String userId = jwtUtil.extractUserId(token);

        User user = authService.findById(userId);

        String newToken = jwtUtil.generateToken(user.getId(), user.getEmail());

        return ResponseEntity.ok(new LoginResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                newToken
        ));
    }
}
