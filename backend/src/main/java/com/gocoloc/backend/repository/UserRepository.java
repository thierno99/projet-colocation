package com.gocoloc.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.gocoloc.backend.domain.User;

public interface UserRepository extends MongoRepository<User, String>{
    
}
