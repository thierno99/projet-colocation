package com.gocoloc.backend.domain;


import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.ManyToAny;
import org.springframework.data.mongodb.core.mapping.Document;

import com.gocoloc.backend.constants.AnnounceType;
import com.gocoloc.backend.constants.RoomType;

import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document("announcement")
@NoArgsConstructor
@AllArgsConstructor
public class Announcement {
	@Id
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
	@Lob
	private byte[] principalPicture;
	private AnnounceType announceType;
	private boolean isOwnerCertified;
	private RoomType roomType;
	private boolean roomfurnishedType;
	@ManyToAny(fetch = FetchType.EAGER)
    private Set<String> genderSearched = new HashSet<>();
	@Lob
	private Set<byte[]> images = new HashSet<>();
	
	
	public Announcement(String title, String description, String ownerId, String state, String city, String postalCode,
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
		this.principalPicture = principalPicture;
		this.announceType = announceType;
		this.isOwnerCertified = isOwnerCertified;
		this.roomType = roomType;
		this.roomfurnishedType = roomfurnishedType;
		this.genderSearched = genderSearched;
	} 
	
	
}
