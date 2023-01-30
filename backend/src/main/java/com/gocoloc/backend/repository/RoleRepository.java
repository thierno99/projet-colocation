package com.gocoloc.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.gocoloc.backend.domain.Role;

public interface RoleRepository extends MongoRepository<Role, String>{
    Role findByName(String name);
}
