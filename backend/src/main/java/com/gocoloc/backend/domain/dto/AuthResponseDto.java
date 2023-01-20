package com.gocoloc.backend.domain.dto;

import lombok.Data;

@Data
public class AuthResponseDto {
    private String accessToken;
    private String tokenType = "Bearer ";
    public AuthResponseDto(String accessToken) {
        this.accessToken = accessToken;
    }

}
