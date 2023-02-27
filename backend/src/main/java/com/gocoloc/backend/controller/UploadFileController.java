package com.gocoloc.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/api/upload")
public interface UploadFileController {
	
	@PostMapping("announce")
	public ResponseEntity<?> uploadImage(@RequestParam("files") MultipartFile[] files);
	
	public String save(MultipartFile files);
}
