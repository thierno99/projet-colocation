package com.gocoloc.backend.service;


import java.util.List;

import com.gocoloc.backend.constants.CandidacyStatus;
import com.gocoloc.backend.domain.Candidacy;
import com.gocoloc.backend.domain.dto.CandidacyResponseDto;

public interface CandidacyService {
	public Candidacy saveCandidacy(Candidacy candidacy);
	public String updateCandidacyStatus(String id, CandidacyStatus status);
	public CandidacyResponseDto getCandidacyById(String candidacyId);
	Candidacy findByOwnerIdAndAnnounceIdAndUserId(String ownerId, String announceId, String userId);
	List<CandidacyResponseDto> findAllByOwnerId(String ownerId);
	List<CandidacyResponseDto> findAllByUserId(String userId);
	public void deleteCandidacyById(String candidacyId);
}
