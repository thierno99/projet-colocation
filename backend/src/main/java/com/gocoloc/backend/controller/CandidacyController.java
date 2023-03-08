package com.gocoloc.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.gocoloc.backend.constants.CandidacyStatus;
import com.gocoloc.backend.domain.Candidacy;

@RequestMapping("/api/candidacy")
public interface CandidacyController {
	@PostMapping("/save")
	public ResponseEntity<Candidacy> saveCandidacy(@RequestBody Candidacy candidacy);
	
	@PostMapping("/update/{status}")
	public ResponseEntity<String> updateCandidacyStatus(@RequestBody String id, @PathVariable CandidacyStatus status);
	
	@GetMapping("/get/{id}")
	public ResponseEntity<?> getCandidacyById(@PathVariable String id);
	
	@GetMapping("/getbyownerid/{ownerId}")
	public ResponseEntity<?> getCandidacyByOwnerId(@PathVariable String ownerId);
	
	@GetMapping("/getbyuserid/{userId}")
	public ResponseEntity<?> getCandidacyByUserId(@PathVariable String userId);
	
	@GetMapping("/get")
	public ResponseEntity<?> findByOwnerIdAndAnnounceIdAndUserId(@RequestParam("ownerId") String ownerId, @RequestParam("announceId") String announceId, @RequestParam("userId") String userId);
	
	
	@DeleteMapping("/del/{announceID}")
	public ResponseEntity<?> deleCandidacyById(@PathVariable String candidacyID);
}
