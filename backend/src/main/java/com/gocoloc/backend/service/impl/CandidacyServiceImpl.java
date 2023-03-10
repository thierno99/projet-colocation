package com.gocoloc.backend.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gocoloc.backend.domain.Candidacy;
import com.gocoloc.backend.domain.dto.CandidacyResponseDto;
import com.gocoloc.backend.repository.CandidacyRepository;
import com.gocoloc.backend.service.AnnouncementService;
import com.gocoloc.backend.service.CandidacyService;
import com.gocoloc.backend.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CandidacyServiceImpl implements CandidacyService {
	@Autowired
	CandidacyRepository candidacyRepository;
	
	@Autowired 
	UserService userService;
	
	@Autowired
	AnnouncementService announcementService;
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	@Override
	public Candidacy saveCandidacy(Candidacy candidacy) {
		
		return candidacyRepository.save(candidacy);
	}

	@Override
	public void deleteCandidacyById(String candidacyId) {
		candidacyRepository.deleteById(candidacyId);
	}

	@Override
	public CandidacyResponseDto getCandidacyById(String candidacyId) {
		Optional<Candidacy> candat = candidacyRepository.findById(candidacyId);
		if(!candat.isEmpty()) {
			Candidacy c = candat.get();
			var announce = announcementService.getAnnounceById(c.getAnnounceId());
			var user = userService.getUserById(c.getUserId());
			
			if(announce.isEmpty() || user.isEmpty() ) {
				return new CandidacyResponseDto();
			}else {
				
				return new CandidacyResponseDto(
						c.getId(),
						announce.get(),
						user.get(),
						c.getStatus()
				);
			}
				
		}
		return new CandidacyResponseDto();
	}
	

	@Override
	public Candidacy findByOwnerIdAndAnnounceIdAndUserId(String ownerId, String announceId, String userId) {
		return candidacyRepository.findByOwnerIdAndAnnounceIdAndUserId(ownerId, announceId, userId);
	}

	@Override
	public List<CandidacyResponseDto> findAllByOwnerId(String ownerId) {
		List<Candidacy> candidacies = candidacyRepository.findAllByOwnerId(ownerId);
		List<CandidacyResponseDto> candidacyResponseDtoList = new ArrayList<>();
		
		for(Candidacy c: candidacies) {
			candidacyResponseDtoList.add(new CandidacyResponseDto(
					c.getId(),
					announcementService.getAnnounceById(c.getAnnounceId()).get(),
					userService.getUserById(c.getUserId()).get(),
					c.getStatus()
			));
		}
		
		
		
		return candidacyResponseDtoList;
	}

	@Override
	public List<CandidacyResponseDto> findAllByUserId(String userId) {
		List<Candidacy> candidacies = candidacyRepository.findAllByUserId(userId);
		List<CandidacyResponseDto> candidacyResponseDtoList = new ArrayList<>();
		
		for(Candidacy c: candidacies) {
			candidacyResponseDtoList.add(new CandidacyResponseDto(
					c.getId(),
					announcementService.getAnnounceById(c.getAnnounceId()).get(),
					userService.getUserById(c.getUserId()).get(),
					c.getStatus()
			));
		}
		
		return candidacyResponseDtoList;
	}

	@Override
	public String updateCandidacyStatus(Candidacy candidacy) {
		String message ="";
		try {
			candidacyRepository.save(candidacy);
		} catch (Exception e) {
			message = "not updated";
			log.info(e.getMessage());
		}
		return message;
	}
	
}
