package com.gocoloc.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FileResponseDto {
	private String filename;
	private String fileDownLoadUri;
	private String fileType;
	private long fileSize;
}
