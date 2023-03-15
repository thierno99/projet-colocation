package com.gocoloc.backend.domain.dto;

import lombok.Data;

@Data
public class AuthResponseDto {
	private String accessToken;
    private String tokenType = "Bearer ";
    private String resultMsg;
    private String id;
    private String name;
    public AuthResponseDto(String accessToken, String resulString, String id, String name) {
        this.resultMsg = resulString;
        this.accessToken = accessToken;
        this.id = id;
        this.name = name;
    }


}
