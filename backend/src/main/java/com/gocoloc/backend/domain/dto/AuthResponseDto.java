package com.gocoloc.backend.domain.dto;

import lombok.Data;

@Data
public class AuthResponseDto {
	private String accessToken;
    private String tokenType = "Bearer ";
    private String resultMsg;
    public AuthResponseDto(String accessToken, String resulString) {
        this.resultMsg = resulString;
        this.accessToken = accessToken;
    }


}
