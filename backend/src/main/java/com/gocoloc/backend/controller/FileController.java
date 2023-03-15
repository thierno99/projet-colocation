package com.gocoloc.backend.controller;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.gocoloc.backend.domain.dto.FileResponseDto;

import jakarta.servlet.http.HttpServletRequest;

@RequestMapping("/files")
public interface FileController {
	@PutMapping
	public ResponseEntity<FileResponseDto> uplopadFile(@RequestParam("file") MultipartFile file);	
	
	@GetMapping("/{filename:.+}")
	public ResponseEntity<Resource> downloadFile(@PathVariable String filename, HttpServletRequest request);
	
}
