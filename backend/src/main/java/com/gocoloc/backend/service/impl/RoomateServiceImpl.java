package com.gocoloc.backend.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gocoloc.backend.domain.Announcement;
import com.gocoloc.backend.domain.Roomate;
import com.gocoloc.backend.domain.User;
import com.gocoloc.backend.domain.dto.RoomateResponseDto;
import com.gocoloc.backend.repository.RoomateRepository;
import com.gocoloc.backend.service.AnnouncementService;
import com.gocoloc.backend.service.RoomateService;
import com.gocoloc.backend.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class RoomateServiceImpl implements RoomateService {
	
	@Autowired
	private RoomateRepository roomateRepository;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private AnnouncementService announcementService;
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	@Override
	public Roomate saveRoomate(String managerId, String userId, String announceId) {
		
		Optional<Roomate> optRoomate = roomateRepository.findByManagerIdAndAnnounceId(managerId, announceId);
		
		if(optRoomate.isEmpty()) {
			Roomate roomate = new Roomate();
			roomate.setAnnounceId(announceId);
			roomate.setManagerId(managerId);
			Set<String> userIds = new HashSet<>();
			userIds.add(userId);
			roomate.setUserIds(userIds);
			roomateRepository.save(roomate);
			log.info("user added as roomates !");
			return roomate;		
		}
		
		Roomate roomate = optRoomate.get();
		Set<String> userIds;
		if(roomate.getUserIds() != null && !roomate.getUserIds().isEmpty()) {
			userIds = new HashSet<>(roomate.getUserIds());
			log.info(String.join(", ", roomate.getUserIds()));
		}else {
			userIds = new HashSet<>();
		}
		userIds.add(userId);
		roomate.setUserIds(userIds);
		roomateRepository.save(roomate);
		log.info("user added as roomates !");
		return roomate;
	}

	@Override
	public RoomateResponseDto getRoomate(String managerId, String announceId) {
		Optional<Roomate> optRoomate = roomateRepository.findByManagerIdAndAnnounceId(managerId, announceId);
		if(optRoomate.isEmpty()) {
			return null;			
		}
		Roomate roomate = optRoomate.get();
		
		RoomateResponseDto roomateRes = new RoomateResponseDto();
		roomateRes.setId(roomate.getId());
		
		User manager = userService.getUserById(managerId).get();
		roomateRes.setManager(manager);
		
		Announcement announce = announcementService.getAnnounceById(announceId).get();
		roomateRes.setAnnounce(announce);
		
		List<User> users = new ArrayList<>();
		
		for(String userId: roomate.getUserIds()) {
			User user = userService.getUserById(userId).get();
			users.add(user);
		}
		
		roomateRes.setRoomates(users);
				
		return roomateRes;
	}

	@Override
	public RoomateResponseDto getRoomateByAnnounceId(String announceId) {
		Query query = new Query().addCriteria(Criteria.where("announceId").is(announceId));
		Roomate roomate = mongoTemplate.findOne(query, Roomate.class);
		
		if(roomate!= null) {
			
			RoomateResponseDto roomateRes = new RoomateResponseDto();
			
			roomateRes.setId(roomate.getId());
			
			User manager = userService.getUserById(roomate.getManagerId()).get();
			roomateRes.setManager(manager);
			
			Announcement announce = announcementService.getAnnounceById(roomate.getAnnounceId()).get();
			roomateRes.setAnnounce(announce);
			
			List<User> users = new ArrayList<>();
			
			for(String uid: roomate.getUserIds()) {
				User user = userService.getUserById(uid).get();
				users.add(user);
			}
			
			roomateRes.setRoomates(users);
			
			return roomateRes;
		}
		return null;	
	}

	@Override
	public RoomateResponseDto getRoomateByUserId(String userId) {
		Query query = new Query().addCriteria(Criteria.where("userIds").in(userId));
		Roomate roomate = mongoTemplate.findOne(query, Roomate.class);
		
		RoomateResponseDto roomateRes = new RoomateResponseDto();
		
		if(roomate != null) {
			
			roomateRes.setId(roomate.getId());
			
			User manager = userService.getUserById(roomate.getManagerId()).get();
			roomateRes.setManager(manager);
			
			Announcement announce = announcementService.getAnnounceById(roomate.getAnnounceId()).get();
			roomateRes.setAnnounce(announce);
			
			List<User> users = new ArrayList<>();
			
			for(String uid: roomate.getUserIds()) {
				User user = userService.getUserById(uid).get();
				users.add(user);
			}
			
			roomateRes.setRoomates(users);
			
			return roomateRes;
		}
		return null;
		
	}

	@Override
	public Roomate removeUserToRoomate(String managerId, String userId, String announceId) {
		Optional<Roomate> optRoomate = roomateRepository.findByManagerIdAndAnnounceId(managerId, announceId);
		if(optRoomate.isEmpty()) {
			return null;			
		}
		Roomate roomate = optRoomate.get();
		
		Set<String> userIds = new HashSet<>(roomate.getUserIds());
		userIds.remove(userId);
		
		roomateRepository.save(roomate);
		log.info("user removed as roomates !");
		return roomate;
	}

}
