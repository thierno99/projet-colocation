package com.gocoloc.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.gocoloc.backend.domain.Announcement;

public interface AnnouncementRepository extends MongoRepository<Announcement, String>{
	Optional<Announcement> findById(String id);
	List<Announcement> findAllByOwnerId(String ownerId);
}
