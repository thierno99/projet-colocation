package com.gocoloc.backend.controller.impl;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.gocoloc.backend.controller.MessageController;
import com.gocoloc.backend.domain.Message;
import com.gocoloc.backend.domain.dto.MessageResponseDto;
import com.gocoloc.backend.service.MessageServce;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class MessageControllerImpl implements MessageController {
	
	@Autowired
	private MessageServce messageServce;

	@Override
	public ResponseEntity<Message> saveMessage(Message message) {
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/message/save").toUriString());
		return ResponseEntity.created(uri).body(messageServce.saveMessage(message));
	}

	@Override
	public ResponseEntity<List<MessageResponseDto>> getMessageBySenderId(String senderId) {
		return ResponseEntity.ok(messageServce.getMessageBySenderId(senderId));
	}

	@Override
	public ResponseEntity<List<MessageResponseDto>> getMessageByUserId(String userId) {
		return ResponseEntity.ok(messageServce.getMessageByUserId(userId));
	}

	@Override
	public ResponseEntity<?> removeMessage(String messageId) {
		try {
			messageServce.removeMessage(messageId);
			return ResponseEntity.ok("supprimé avec succès !");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("echec de suppression.");
		}
	}

	@Override
	public ResponseEntity<Message> updateMessage(Message message) {
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/message/update").toUriString());
		return ResponseEntity.created(uri).body(messageServce.saveMessage(message));
	}

}
