package com.gocoloc.backend.service;

import java.util.List;
import java.util.Optional;

import com.gocoloc.backend.domain.Announcement;

public interface AnnouncementService {
	
	Announcement saveAnnounce(Announcement announce);
	Optional<Announcement> getAnnounceById(String id);
	List<Announcement> getAnnouncements();
	List<Announcement> getAnnouncementsBetween(int start, int end);
}
