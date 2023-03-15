package com.gocoloc.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gocoloc.backend.domain.Message;
import com.gocoloc.backend.domain.dto.MessageResponseDto;

@RequestMapping("/api/message")
public interface MessageController {
	@PostMapping("/save")
	public ResponseEntity<Message> saveMessage(@RequestBody Message message);
	@PutMapping("/update")
	public ResponseEntity<Message> updateMessage(@RequestBody Message message);
	
	@GetMapping("/send/{senderId}")
	public ResponseEntity<List<MessageResponseDto>> getMessageBySenderId(@PathVariable String senderId);
	
	@GetMapping("/receive/{userId}")
	public ResponseEntity<List<MessageResponseDto>> getMessageByUserId(@PathVariable String userId);
	
	@DeleteMapping("/del/{messageId}")
	public ResponseEntity<?> removeMessage(@PathVariable String messageId);
}
