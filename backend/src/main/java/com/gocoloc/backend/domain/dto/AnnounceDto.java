package com.gocoloc.backend.domain.dto;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import org.springframework.web.multipart.MultipartFile;
import com.gocoloc.backend.constants.AnnounceType;
import com.gocoloc.backend.constants.RoomType;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class AnnounceDto {
	private String id;
	private String title;
	private String description;
	private String ownerId;
	private String state;
	private String city;
	private String postalCode;
	private String address;
	private int nbRoomatesSeached;
	private LocalDateTime publishedAt;
	private double price;
	private MultipartFile principalPicture;
	private AnnounceType announceType;
	private boolean isOwnerCertified;
	private RoomType roomType;
	private boolean roomfurnishedType;
    private Set<String> genderSearched = new HashSet<>();
	private Set<MultipartFile[]> images = new HashSet<>();
	
	
	public AnnounceDto(String title, String description, String ownerId, String state, String city, String postalCode,
			String address, int nbRoomatesSeached, LocalDateTime publishedAt, double price, byte[] principalPicture,
			AnnounceType announceType, boolean isOwnerCertified, RoomType roomType, boolean roomfurnishedType,
			Set<String> genderSearched) {
		super();
		this.title = title;
		this.description = description;
		this.ownerId = ownerId;
		this.state = state;
		this.city = city;
		this.postalCode = postalCode;
		this.address = address;
		this.nbRoomatesSeached = nbRoomatesSeached;
		this.publishedAt = publishedAt;
		this.price = price;
		this.announceType = announceType;
		this.isOwnerCertified = isOwnerCertified;
		this.roomType = roomType;
		this.roomfurnishedType = roomfurnishedType;
		this.genderSearched = genderSearched;
	} 

}
