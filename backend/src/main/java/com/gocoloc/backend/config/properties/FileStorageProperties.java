package com.gocoloc.backend.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import lombok.Data;

@ConfigurationProperties(prefix="file")
@Data
public class FileStorageProperties {
	
	private String uploadDir;
	
}
