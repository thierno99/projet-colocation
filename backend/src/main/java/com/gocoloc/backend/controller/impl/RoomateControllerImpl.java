package com.gocoloc.backend.controller.impl;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.gocoloc.backend.controller.RoomateController;
import com.gocoloc.backend.domain.Roomate;
import com.gocoloc.backend.domain.dto.RoomateResponseDto;
import com.gocoloc.backend.service.RoomateService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class RoomateControllerImpl implements RoomateController {
	
	@Autowired
	private RoomateService roomateService;

	@Override
	public ResponseEntity<Roomate> saveRoomate(String managerId, String userId, String announceId) {
		URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/roomate/add").toUriString());
		return ResponseEntity.created(uri).body(roomateService.saveRoomate(managerId, userId, announceId));
	}

	@Override
	public ResponseEntity<RoomateResponseDto> getRoomate(String managerId, String announceId) {
		return ResponseEntity.ok(roomateService.getRoomate(managerId, announceId));
	}

	@Override
	public ResponseEntity<RoomateResponseDto> getRoomateByAnnounceId(String announceId) {
		return ResponseEntity.ok(roomateService.getRoomateByAnnounceId(announceId));
	}

	@Override
	public ResponseEntity<RoomateResponseDto> getRoomateByUserId(String userId) {
		return ResponseEntity.ok(roomateService.getRoomateByUserId(userId));
	}

	@Override
	public ResponseEntity<?> removeRoomate(String managerId, String userId, String announceId) {
		return ResponseEntity.ok(roomateService.removeUserToRoomate(managerId, userId, announceId));
	}

}
