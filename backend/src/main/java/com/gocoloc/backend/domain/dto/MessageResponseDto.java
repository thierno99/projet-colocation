package com.gocoloc.backend.domain.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.gocoloc.backend.domain.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponseDto {
	private String id;
	private User sender;
	private String subject;
	private String content;
	private LocalDateTime sendAt;
	private List<User> receivers;
	private List<String> readBy;
}
