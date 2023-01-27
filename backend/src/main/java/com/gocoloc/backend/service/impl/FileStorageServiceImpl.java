package com.gocoloc.backend.service.impl;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.gocoloc.backend.config.properties.FileStorageProperties;
import com.gocoloc.backend.exception.FileStorageException;
import com.gocoloc.backend.exception.TheFileNotFoundException;
import com.gocoloc.backend.service.FileStorageService;


@Service
public class FileStorageServiceImpl implements FileStorageService{
	private final Path FILE_STORAGE_LOCATION;

	@Autowired
	public FileStorageServiceImpl(FileStorageProperties fileStorageProperties ) {
		super();
		FILE_STORAGE_LOCATION = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();
		try {
			Files.createDirectories(FILE_STORAGE_LOCATION);
		} catch (IOException e) {
			e.printStackTrace();
			throw new FileStorageException("Could not create the directory to upload");
		}
	}
	
//	Store the file
	public String storeFile(MultipartFile file) {
		String filename = StringUtils.cleanPath(file.getOriginalFilename());
		
		try {
			Path targetLocation = this.FILE_STORAGE_LOCATION.resolve(filename);
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
			return filename;
		} catch (IOException e) {
			throw new FileStorageException("Could not store file "+ filename + ". Please try again !", e);
		}
	}
	
//	Load the file
	
	public Resource loadFileResource(String filename) {
		try {
			Path filePath = this.FILE_STORAGE_LOCATION.resolve(filename);
			Resource resource = new UrlResource(filePath.toUri());
			
			if(resource.exists()) {
				return resource;				
			}else {
				throw new TheFileNotFoundException("File not found " + filename);			
			}
			
		} catch (MalformedURLException e) {
			throw new TheFileNotFoundException("File not found " + filename);
		}
	}
	
}
