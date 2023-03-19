package com.gocoloc.backend.domain.dto;

import java.time.LocalDateTime;

import com.gocoloc.backend.domain.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskResponseDto {
	private String id;
	private String title;
	private String description;
	private String status;
	private String priority;
	private User createdBy;
	private User assignedTo;
	private LocalDateTime createdAt;

}
