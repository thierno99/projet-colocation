package com.gocoloc.backend.domain;

import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import com.gocoloc.backend.constants.CandidacyStatus;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document("candidacies")
@NoArgsConstructor
@AllArgsConstructor
@CompoundIndex(name = "no_duplicated_announce", def = "{'announceId': 1, 'ownerId': 1, 'userId': 1}", unique = true)
public class Candidacy {
	@Id
    private String id;
	private String announceId;
	private String ownerId;
	private String userId;
	@Enumerated(EnumType.STRING)
	private CandidacyStatus status;
	public Candidacy(String announceId, String ownerId, String userId, CandidacyStatus status) {
		super();
		this.announceId = announceId;
		this.ownerId = ownerId;
		this.userId = userId;
		this.status = status;
	}
	
	
}
