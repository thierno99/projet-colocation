package com.gocoloc.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.gocoloc.backend.domain.Announcement;

@RequestMapping("/api/announces")
public interface AnnouncementController {
	
	@GetMapping("/views")
	public ResponseEntity<List<Announcement>> getAnnouncements();
	
	@PostMapping("/save")
	public ResponseEntity<Announcement> saveAnnouncement(@RequestBody Announcement announce);
	
	@GetMapping("/announce/{id}")
	public ResponseEntity<?> getAnnouncementById(@PathVariable String id);
	
	@DeleteMapping("/announce/{announceID}")
	public ResponseEntity<?> deleAnnouncementById(@PathVariable String announceID);
	
	@GetMapping("announce/min-max")
	public ResponseEntity<?> getAnnouncementsBetween(@RequestParam("start") int start, @RequestParam("end") int end);
	
	@PostMapping("saveannounce")
	public ResponseEntity<?> saveAnnounce(@RequestParam("files") MultipartFile[] files, @RequestParam("announce") String announceStr, @RequestParam("imagepp") MultipartFile imagePrincipale);
	
}
