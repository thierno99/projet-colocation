package com.gocoloc.backend.controller.impl;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.gocoloc.backend.controller.AnnouncementController;
import com.gocoloc.backend.domain.Announcement;
import com.gocoloc.backend.service.AnnouncementService;

import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AnnouncementControllerImpl implements AnnouncementController {
	
	@Autowired
	private AnnouncementService announcementService;
	
	@Override
	public ResponseEntity<List<Announcement>> getAnnouncements() {
		return ResponseEntity.ok().body(announcementService.getAnnouncements());
	}

	@Override
	public ResponseEntity<Announcement> saveAnnouncement(Announcement announce) {
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/announces/save").toUriString());
		
        return ResponseEntity.created(uri).body(announcementService.saveAnnounce(announce));
	}

	@Override
	public ResponseEntity<?> getAnnouncementById(String id) {
		Optional<Announcement> announce = announcementService.getAnnounceById(id);
		
		if(announce.isEmpty() || announce.get() == null) {
			return new ResponseEntity<>("some problems occured !", HttpStatus.BAD_REQUEST); 
		}
		return ResponseEntity.ok().body(announce.get());
	}

	@Override
	public ResponseEntity<?> getAnnouncementsBetween(int start, int end) {
		return ResponseEntity.ok().body(announcementService.getAnnouncementsBetween(start, end));
	}

}
