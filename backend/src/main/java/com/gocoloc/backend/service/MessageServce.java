package com.gocoloc.backend.service;

import java.util.List;

import com.gocoloc.backend.domain.Message;
import com.gocoloc.backend.domain.dto.MessageResponseDto;

public interface MessageServce {
	public Message saveMessage(Message message);
	public List<MessageResponseDto> getMessageBySenderId(String senderId);
	public List<MessageResponseDto> getMessageByUserId(String userId);
	public void removeMessage(String messageId);
}
