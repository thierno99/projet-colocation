package com.gocoloc.backend.controller.impl;

import java.io.File;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.gocoloc.backend.controller.AnnouncementController;
import com.gocoloc.backend.domain.Announcement;
import com.gocoloc.backend.service.AnnouncementService;
import jakarta.servlet.ServletContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

//import com.mongodb.BasicBinary;

@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class AnnouncementControllerImpl implements AnnouncementController, ServletContextAware {
	
	private ServletContext servletContext;
	
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

	@Override
	public ResponseEntity<?> saveAnnounce(MultipartFile[] files, String announceStr, MultipartFile imagePrincipale) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.registerModule(new JavaTimeModule());
			Announcement announce = objectMapper.readValue(announceStr, Announcement.class);
			announce.setPrincipalPicture(imagePrincipale.getBytes());
			
			Set<byte[]> images = new HashSet<>();
						
			for (MultipartFile file: files) {
				images.add(file.getBytes());
				//save(file);
			}
			
			log.info(announceStr);
			
			
			announce.setImages(images);
			
			
			URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/announces/saveannounce").toUriString());
			
	        return ResponseEntity.created(uri).body(announcementService.saveAnnounce(announce));
	        
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	public String save(MultipartFile file) {
		try {
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("ddMMyyyyHHmmss");
			String filename = file.getOriginalFilename();
			String newFileName = simpleDateFormat.format(new Date()).concat(filename);
			
			byte[] filesBytes = file.getBytes();
			
			boolean isExistDir = new File(this.servletContext.getRealPath("/uploads/images/")).mkdir();
			
			if( !isExistDir) {
				new File(this.servletContext.getRealPath("/uploads/images/")).mkdir();
			}
			
			Path path = Paths.get(this.servletContext.getRealPath("/uploads/images/".concat(newFileName)));
			Files.write(path, filesBytes);
			return newFileName;
		} catch (Exception e) {
			return null;
		}
	}
	
	@Override
	public ResponseEntity<?> deleAnnouncementById(String announceID) {
		announcementService.deleAnnouncementById(announceID);
		return ResponseEntity.ok("");
	}
	
	
	

	@Override
	public void setServletContext(ServletContext servletContext) {
		this.servletContext = servletContext;
		
	}
	
	

	@Override
	public ResponseEntity<?> editAnnounce(MultipartFile[] files, List<byte[]> bytefiles, String announceStr, MultipartFile imagePrincipale) {

		try {
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.registerModule(new JavaTimeModule());
			Announcement announce = objectMapper.readValue(announceStr, Announcement.class);
			
			announce.setPrincipalPicture(imagePrincipale.getBytes());
			
			Set<byte[]> images = new HashSet<>();
						
			for (MultipartFile file: files) {
				images.add(file.getBytes());
			}
			
			for(byte[] file: bytefiles) {
				images.add(file);
			}
			
			log.info(announceStr);
			
			
			announce.setImages(images);
			
			
			URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/announces/saveannounce").toUriString());
			
	        return ResponseEntity.created(uri).body(announcementService.saveAnnounce(announce));
	        
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@Override
	public ResponseEntity<?> editAnnounceBinImgpp(MultipartFile[] files, List<byte[]> bytefiles, String announceStr,
			byte[] imagePrincipale) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.registerModule(new JavaTimeModule());
			Announcement announce = objectMapper.readValue(announceStr, Announcement.class);
			announce.setPrincipalPicture(imagePrincipale);
			
			Set<byte[]> images = new HashSet<>();
						
			for (MultipartFile file: files) {
				images.add(file.getBytes());
			}
			
			for(byte[] file: bytefiles) {
				images.add(file);
			}
			
			log.info(announceStr);
			
			
			announce.setImages(images);
			
			
			URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/announces/saveannounce").toUriString());
			
	        return ResponseEntity.created(uri).body(announcementService.saveAnnounce(announce));
	        
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	

}
