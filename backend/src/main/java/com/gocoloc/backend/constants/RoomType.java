package com.gocoloc.backend.constants;

public enum RoomType {
	APPARTEMENT("appartement"),
	STUDIO("studio"),
	MAISON("maison");
	
	private String type;
	
	RoomType(String roomType) {
		this.type = roomType;
	}
	
	public String getType() {
		return type;
	}
}
