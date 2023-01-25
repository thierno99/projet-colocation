package com.gocoloc.backend.domain.dto;

import lombok.Data;

@Data
public class AuthResponseDto {
    private String resultMsg;
    public AuthResponseDto(String resulString) {
        this.resultMsg = resulString;
    }


}
