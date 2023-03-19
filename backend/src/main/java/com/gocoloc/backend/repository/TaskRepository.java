package com.gocoloc.backend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.gocoloc.backend.domain.Task;

public interface TaskRepository extends MongoRepository<Task, String> {
	public Optional<Task> findById(String id);
}
