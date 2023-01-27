package com.gocoloc.backend.constants;


public enum AnnounceType {
	
	HAVEROOM("haveRoom"),
	
	NEEDROOM("needRoom");
	
	private String type;
	
	AnnounceType(String announceType) {
		this.type = announceType;
	}
	
	public String getType() {
		return type;
	}
}
