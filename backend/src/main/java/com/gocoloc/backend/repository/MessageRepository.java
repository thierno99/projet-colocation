package com.gocoloc.backend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.gocoloc.backend.domain.Message;

public interface MessageRepository extends MongoRepository<Message, String> {
	public Optional<Message> findById(String id);
}
