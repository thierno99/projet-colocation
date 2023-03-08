package com.gocoloc.backend.domain.dto;

import com.gocoloc.backend.constants.CandidacyStatus;
import com.gocoloc.backend.domain.Announcement;
import com.gocoloc.backend.domain.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CandidacyResponseDto {
	private String id;
	private Announcement announce;
	private User user;
	private CandidacyStatus status; 
}
