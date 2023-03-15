package com.gocoloc.backend.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gocoloc.backend.domain.Message;
import com.gocoloc.backend.domain.User;
import com.gocoloc.backend.domain.dto.MessageResponseDto;
import com.gocoloc.backend.repository.MessageRepository;
import com.gocoloc.backend.service.MessageServce;
import com.gocoloc.backend.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MessageServceImpl implements MessageServce {
	@Autowired
	private MessageRepository messageRepository;
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	@Autowired
	private UserService userService;

	@Override
	public Message saveMessage(Message message) {
		return messageRepository.save(message);
	}

	@Override
	public List<MessageResponseDto> getMessageBySenderId(String senderId) {
		Query query = new Query().addCriteria(Criteria.where("senderId").is(senderId));
		List<Message> messages = mongoTemplate.find(query, Message.class);
		if(messages != null && !messages.isEmpty() ) {
			List<MessageResponseDto>  messageResponses = new ArrayList<>();
			for(Message message: messages) {
				MessageResponseDto messageResTmp = new MessageResponseDto();
				messageResTmp.setId(message.getId());
				messageResTmp.setContent(message.getContent());
				messageResTmp.setSubject(message.getSubject());
				messageResTmp.setSendAt(message.getSendAt());
				
				User sender = userService.getUserById(senderId).get();
				messageResTmp.setSender(sender);
				
				List<User> users = new ArrayList<>();
				
				for(String uid: message.getUserIds()) {
					User user = userService.getUserById(uid).get();
					users.add(user);
				}
				
				messageResTmp.setReceivers(users);
				List<String> readBy = new ArrayList<>();
				readBy.addAll(message.getReadBy());
				messageResTmp.setReadBy(readBy);
				messageResponses.add(messageResTmp);
			}
			return messageResponses;
		}
		return Collections.emptyList();
	}
	
	@Override
	public List<MessageResponseDto> getMessageByUserId(String userId) {
		Query query = new Query().addCriteria(Criteria.where("userIds").in(userId));
		List<Message> messages = mongoTemplate.find(query, Message.class);
		
		if(messages != null && !messages.isEmpty() ) {
			List<MessageResponseDto>  messageResponses = new ArrayList<>();
			for(Message message: messages) {
				System.out.println(message.toString());
				MessageResponseDto messageResTmp = new MessageResponseDto();
				messageResTmp.setId(message.getId());
				messageResTmp.setContent(message.getContent());
				messageResTmp.setSubject(message.getSubject());
				messageResTmp.setSendAt(message.getSendAt());
				
				User sender = userService.getUserById(message.getSenderId()).get();
				messageResTmp.setSender(sender);
				
				List<User> users = new ArrayList<>();
				
				for(String uid: message.getUserIds()) {
					User user = userService.getUserById(uid).get();
					users.add(user);
				}
				
				messageResTmp.setReceivers(users);
				List<String> readBy = new ArrayList<>();
				readBy.addAll(message.getReadBy());
				messageResTmp.setReadBy(readBy);
				messageResponses.add(messageResTmp);
			}
			
			return messageResponses;
		}
		return Collections.emptyList();
	}

	@Override
	public void removeMessage(String messageId) {
		messageRepository.deleteById(messageId);
	}

}
