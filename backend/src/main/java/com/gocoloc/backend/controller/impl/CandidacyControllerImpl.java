package com.gocoloc.backend.controller.impl;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.gocoloc.backend.constants.CandidacyStatus;
import com.gocoloc.backend.controller.CandidacyController;
import com.gocoloc.backend.domain.Candidacy;
import com.gocoloc.backend.service.CandidacyService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class CandidacyControllerImpl implements CandidacyController {
	@Autowired
	CandidacyService candidacyService;

	@Override
	public ResponseEntity<Candidacy> saveCandidacy(Candidacy candidacy) {
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/candidacy/save").toUriString());
		
        return ResponseEntity.created(uri).body(candidacyService.saveCandidacy(candidacy));
	}

	@Override
	public ResponseEntity<?> getCandidacyById(String id) {
		return ResponseEntity.ok(candidacyService.getCandidacyById(id));
	}

	@Override
	public ResponseEntity<?> deleCandidacyById(String candidacyID) {
		candidacyService.deleteCandidacyById(candidacyID);
		return ResponseEntity.ok("");
	}

	@Override
	public ResponseEntity<?> getCandidacyByOwnerId(String ownerId) {
		return ResponseEntity.ok(candidacyService.findAllByOwnerId(ownerId));
	}

	@Override
	public ResponseEntity<?> getCandidacyByUserId(String userId) {
		return ResponseEntity.ok(candidacyService.findAllByUserId(userId));
	}

	@Override
	public ResponseEntity<?> findByOwnerIdAndAnnounceIdAndUserId(String ownerId, String announceId, String userId) {
		return ResponseEntity.ok(candidacyService.findByOwnerIdAndAnnounceIdAndUserId(ownerId, announceId, userId));
	}

	@Override
	public ResponseEntity<String> updateCandidacyStatus(String id, CandidacyStatus status) {
		return ResponseEntity.ok(candidacyService.updateCandidacyStatus(id, status));
	}

}
