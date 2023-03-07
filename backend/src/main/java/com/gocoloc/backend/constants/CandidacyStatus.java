package com.gocoloc.backend.constants;

public enum CandidacyStatus {
	ENCOURS("en cours"),
	
	REFUSED("needRoom"),
	
	ACCEPTED("accepted");
	
	private String type;
	
	CandidacyStatus(String candidacyStatusType) {
		this.type = candidacyStatusType;
	}
	
	public String getType() {
		return type;
	}
}
