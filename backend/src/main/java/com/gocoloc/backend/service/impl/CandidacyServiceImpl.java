package com.gocoloc.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gocoloc.backend.domain.Candidacy;
import com.gocoloc.backend.repository.CandidacyRepository;
import com.gocoloc.backend.service.CandidacyService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CandidacyServiceImpl implements CandidacyService {
	@Autowired
	CandidacyRepository candidacyRepository;
	@Override
	public Candidacy saveCandidacy(Candidacy candidacy) {
		
		return candidacyRepository.save(candidacy);
	}

	@Override
	public void deleteCandidacyById(String candidacyId) {
		candidacyRepository.deleteById(candidacyId);

	}

	@Override
	public Candidacy getCandidacyById(String candidacyId) {
		Optional<Candidacy> candat = candidacyRepository.findById(candidacyId);
		return candat.get();
	}

	@Override
	public Candidacy findByOwnerIdAndAnnounceIdAndUserId(String ownerId, String announceId, String userId) {
		return candidacyRepository.findByOwnerIdAndAnnounceIdAndUserId(ownerId, announceId, userId);
	}

	@Override
	public List<Candidacy> findAllByOwnerId(String ownerId) {
		return candidacyRepository.findAllByOwnerId(ownerId);
	}

	@Override
	public List<Candidacy> findAllByUserId(String userId) {
		return candidacyRepository.findAllByUserId(userId);
	}

}
