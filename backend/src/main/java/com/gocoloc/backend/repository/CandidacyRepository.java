package com.gocoloc.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.gocoloc.backend.domain.Candidacy;

public interface CandidacyRepository extends MongoRepository<Candidacy, String> {
	Candidacy findByOwnerIdAndAnnounceIdAndUserId(String ownerId, String announceId, String userId);
	public List<Candidacy> findAllByOwnerId(String ownerId);
	List<Candidacy> findAllByUserId(String userId);
}
