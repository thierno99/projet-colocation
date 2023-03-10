package com.gocoloc.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.gocoloc.backend.domain.Roomate;
import com.gocoloc.backend.domain.dto.RoomateResponseDto;

@RequestMapping("/api/roomate")
public interface RoomateController {
	
	@PostMapping("/add")
	public ResponseEntity<Roomate> saveRoomate(
			@RequestParam("managerId") String managerId, 
			@RequestParam("userId") String userId, 
			@RequestParam("announceId") String announceId
	);
	
	@GetMapping("/common")
	public ResponseEntity<RoomateResponseDto> getRoomate(
			@RequestParam("managerId") String managerId,
			@RequestParam("announceId") String announceId
	);
	
	@GetMapping("/getbyaid")
	public ResponseEntity<RoomateResponseDto> getRoomateByAnnounceId(
			@RequestParam("announceId") String announceId
	);
	
	@GetMapping("/getbyuid")
	public ResponseEntity<RoomateResponseDto> getRoomateByUserId(
			@RequestParam("userId") String userId
	);
	
	@DeleteMapping("/delete-user")
	public ResponseEntity<?> removeRoomate(
			@RequestParam("managerId") String managerId,
			@RequestParam("userId") String userId,
			@RequestParam("announceId") String announceId
	);
}
