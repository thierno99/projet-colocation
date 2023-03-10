package com.gocoloc.backend.service;

import com.gocoloc.backend.domain.Roomate;
import com.gocoloc.backend.domain.dto.RoomateResponseDto;

public interface RoomateService {
	public Roomate saveRoomate(String managerId, String userId, String announceId);
	public RoomateResponseDto getRoomate(String managerId, String announceId);
	public RoomateResponseDto getRoomateByAnnounceId(String announceId);
	public RoomateResponseDto getRoomateByUserId(String userId);
	public Roomate removeUserToRoomate(String managerId, String userId, String announceId);
}
