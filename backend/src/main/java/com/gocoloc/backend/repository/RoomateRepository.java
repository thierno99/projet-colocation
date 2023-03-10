package com.gocoloc.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.gocoloc.backend.domain.Roomate;

public interface RoomateRepository extends MongoRepository<Roomate, String> {
	public Optional<List<Roomate>> findByManagerId(String managerId);
	Optional<Roomate> findByManagerIdAndAnnounceId(String managerId, String announceId);
}
