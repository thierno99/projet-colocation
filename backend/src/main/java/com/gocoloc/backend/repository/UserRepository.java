package com.gocoloc.backend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.gocoloc.backend.domain.User;

public interface UserRepository extends MongoRepository<User, String>{
    Optional<User> findById(String id);
    User findByEmail(String email);
    public boolean existsByEmail(String email);
}
