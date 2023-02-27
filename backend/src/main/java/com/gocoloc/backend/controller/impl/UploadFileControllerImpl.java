package com.gocoloc.backend.controller.impl;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.multipart.MultipartFile;

import com.gocoloc.backend.controller.UploadFileController;

import jakarta.servlet.ServletContext;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class UploadFileControllerImpl implements UploadFileController, ServletContextAware {
	
	private ServletContext servletContext;

	@Override
	public ResponseEntity<?> uploadImage(MultipartFile[] files) {
		try {
			log.info("-----------------------------------files upload------------------------------------------");
			for (MultipartFile file: files) {
				log.info("file: ".concat(file.getOriginalFilename()));
				save(file);
			}
			
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@Override
	public String save(MultipartFile file) {
		try {
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("ddMMyyyyHHmmss");
			String newFileName = simpleDateFormat.format(new Date()).concat(file.getOriginalFilename());
			byte[] filesBytes = file.getBytes();
			Path path = Paths.get(this.servletContext.getRealPath("/uploads/images/".concat(newFileName)));
			Files.write(path, filesBytes);
			return newFileName;
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public void setServletContext(ServletContext servletContext) {
		this.servletContext = servletContext;
		
	}

}
