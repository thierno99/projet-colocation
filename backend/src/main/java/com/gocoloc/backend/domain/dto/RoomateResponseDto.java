package com.gocoloc.backend.domain.dto;

import java.util.List;

import com.gocoloc.backend.domain.Announcement;
import com.gocoloc.backend.domain.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomateResponseDto {
	private String id;
	private User manager;
	private Announcement announce;
	private List<User> roomates;
}
