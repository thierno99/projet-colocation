package com.gocoloc.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gocoloc.backend.domain.Announcement;
import com.gocoloc.backend.repository.AnnouncementRepository;
import com.gocoloc.backend.service.AnnouncementService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AnnoucementServiceImpl implements AnnouncementService {
	
	@Autowired
	private AnnouncementRepository announcementRepository;
	
	@Autowired
    private MongoOperations mongoOps;
	
	@Override
	public Announcement saveAnnounce(Announcement announce) {
		if(announce.isValid()) {
			return announcementRepository.save(announce);
		}
		return null;
	}

	@Override
	public Optional<Announcement> getAnnounceById(String id) {
		
		return announcementRepository.findById(id);
	}

	@Override
	public List<Announcement> getAnnouncements() {
		return announcementRepository.findAll();
	}

	@Override
	public List<Announcement> getAnnouncementsBetween(int start, int end) {
        Query query = new Query().with(Sort.by("_id")).skip(start-1).limit(end-start+1);
        return mongoOps.find(query, Announcement.class);
    }

	@Override
	public List<Announcement> getAnnouncementByOwnerId(String ownerId) {
		
		return announcementRepository.findAllByOwnerId(ownerId);
	}

}
