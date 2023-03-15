package com.gocoloc.backend.domain;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.ManyToAny;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document("messages")
@NoArgsConstructor
@AllArgsConstructor
public class Message {
	@Id
	private String id;
	private String senderId;
	private String subject;
	private String content;
	private LocalDateTime sendAt;
	
	@ManyToAny(fetch = FetchType.EAGER)
	private Set<String> userIds;
	
	@ManyToAny(fetch = FetchType.EAGER)
	private Set<String> readBy;
	public Message(String senderId, String subject, String content, LocalDateTime sendAt, Set<String> userIds) {
		this.senderId = senderId;
		this.subject = subject;
		this.content = content;
		this.sendAt = sendAt;
		this.userIds = userIds;
	}
	public Message(String senderId, String subject, String content, LocalDateTime sendAt, Set<String> userIds,
			Set<String> readBy) {
		this.senderId = senderId;
		this.subject = subject;
		this.content = content;
		this.sendAt = sendAt;
		this.userIds = userIds;
		this.readBy = readBy;
	}
	
	
	
	
	
}
