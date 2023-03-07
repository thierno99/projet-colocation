package com.gocoloc.backend.service;


import java.util.List;

import com.gocoloc.backend.domain.Candidacy;

public interface CandidacyService {
	public Candidacy saveCandidacy(Candidacy candidacy);
	public Candidacy getCandidacyById(String candidacyId);
	Candidacy findByOwnerIdAndAnnounceIdAndUserId(String ownerId, String announceId, String userId);
	List<Candidacy> findAllByOwnerId(String ownerId);
	List<Candidacy> findAllByUserId(String userId);
	public void deleteCandidacyById(String candidacyId);
}
