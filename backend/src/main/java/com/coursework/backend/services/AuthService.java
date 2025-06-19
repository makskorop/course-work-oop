package com.coursework.backend.services;

import com.coursework.backend.dto.LoginRequest;
import com.coursework.backend.dto.RegisterRequest;
import com.coursework.backend.models.User;
import com.coursework.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordService passwordService;

    public User register(RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }

        User user = User.builder()
                .username(request.username())
                .email(request.email())
                .password(passwordService.encode(request.password()))
                .createdAt(Instant.now())
                .build();

        return userRepository.save(user);
    }

    public User login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordService.matches(request.password(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return user;
    }

    public User findById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
