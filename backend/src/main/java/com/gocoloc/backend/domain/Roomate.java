package com.gocoloc.backend.domain;


import java.util.Set;

import org.hibernate.annotations.ManyToAny;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document("roomates")
@NoArgsConstructor
@AllArgsConstructor
@CompoundIndex(name = "no_duplicated_manager_announce", def = "{'announceId': 1, 'managerId': 1}", unique = true)
public class Roomate {
	@Id
	private String id;
	private String managerId;
	@Indexed(unique = true)
	private String announceId;
	@ManyToAny(fetch = FetchType.EAGER)
	private Set<String> userIds;
	public Roomate(String managerId, Set<String> userIds) {
		super();
		this.managerId = managerId;
		this.userIds = userIds;
	}
}
