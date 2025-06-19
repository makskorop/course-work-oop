package com.coursework.backend.dto;

public record LoginResponse(
        String id,
        String username,
        String email,
        String token
) {}
