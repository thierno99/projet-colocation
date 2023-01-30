package com.gocoloc.backend.controller.impl;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.gocoloc.backend.controller.FileController;
import com.gocoloc.backend.domain.dto.FileResponseDto;
import com.gocoloc.backend.service.FileStorageService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class FileControllerImpl implements FileController{
	@Autowired
	private FileStorageService fileStorageService;

	@Override
	public ResponseEntity<FileResponseDto> uplopadFile(MultipartFile file) {
		String filename = fileStorageService.storeFile(file);
		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
				.path("/files/")
				.path(filename)
				.toUriString()
		;
		FileResponseDto fileResponse = new FileResponseDto(filename, fileDownloadUri,file.getContentType(), file.getSize());
		return new ResponseEntity<>(fileResponse, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Resource> downloadFile(String filename, HttpServletRequest request) {
		Resource resource = fileStorageService.loadFileResource(filename);
		
		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());			
		} catch(IOException ioe) {
			log.error("could not deternmine file type");
		}
		
		if(contentType == null) {
			contentType = "appplication/octect-stream";
		}
		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType)).body(resource);
	}
	
	
	
	
}
