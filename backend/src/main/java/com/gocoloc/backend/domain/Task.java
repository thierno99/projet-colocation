package com.gocoloc.backend.domain;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document("tasks")
@NoArgsConstructor
@AllArgsConstructor
public class Task {
	@Id
	private String id;
	private String title;
	private String description;
	private String status;
	private String priority;
	private String createdBy;
	private String assignedTo;
	private LocalDateTime createdAt;
	
	public Task(String title, String description, String status, String priority, String createdBy, String assignedTo,
			LocalDateTime createdAt) {
		this.title = title;
		this.description = description;
		this.status = status;
		this.priority = priority;
		this.createdBy = createdBy;
		this.assignedTo = assignedTo;
		this.createdAt = createdAt;
	}

	public Task(String title, String description, String status, String priority, String createdBy, LocalDateTime createdAt) {
		this.title = title;
		this.description = description;
		this.status = status;
		this.priority = priority;
		this.createdBy = createdBy;
		this.createdAt = createdAt;
	}
	
}
