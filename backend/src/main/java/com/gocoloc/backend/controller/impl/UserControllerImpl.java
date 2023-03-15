package com.gocoloc.backend.controller.impl;

import java.net.URI;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.gocoloc.backend.controller.UserController;
import com.gocoloc.backend.domain.Announcement;
import com.gocoloc.backend.domain.Role;
import com.gocoloc.backend.domain.User;
import com.gocoloc.backend.domain.dto.AuthResponseDto;
import com.gocoloc.backend.domain.dto.LoginDto;
import com.gocoloc.backend.service.AnnouncementService;
import com.gocoloc.backend.service.UserService;

import lombok.RequiredArgsConstructor;
@RestController
@RequiredArgsConstructor
public class UserControllerImpl implements UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private AnnouncementService announcementService;

    @Override
    public ResponseEntity<List<User>> getUsers(){
        return ResponseEntity.ok().body(userService.getUsers());
    }
    


	@Override
	public ResponseEntity<?> getUserById(String userId) {
		Optional<User> user = userService.getUserById(userId);
		
		if(user.isEmpty() || user.get() == null) {
			return new ResponseEntity<>("some problems occured !", HttpStatus.BAD_REQUEST); 
		}
		return ResponseEntity.ok().body(user.get());
	}

    @Override
    public ResponseEntity<?> saveUser(User user) {
        if(userService.existsByuserEmail(user.getEmail())){
            return new ResponseEntity<>("An account with that email already exists", HttpStatus.BAD_REQUEST);
        }
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/auth/user/register").toUriString());
        return ResponseEntity.created(uri).body(userService.SaveUser(user));
    }
    

	@Override
	public ResponseEntity<?> updateUser( String userId, User user) {
		if(userService.existsByuserEmail(user.getEmail())){
	        return ResponseEntity.accepted().body(userService.updateUser(user));
        }
		return new ResponseEntity<>("User not Found", HttpStatus.NOT_FOUND);
        
	}

    @Override
    public ResponseEntity<AuthResponseDto> loginUser(LoginDto login) {
        return new ResponseEntity<>(userService.loginUser(login), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Role> saveRole(Role role) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/auth/user/role/save").toUriString());
        return ResponseEntity.created(uri).body(userService.saveRole(role));
    }

    @Override
    public ResponseEntity<?> addRoleToUser(RoleToUserForm form) {
        userService.addRoleToUser(form.getEmail(), form.getRoleName());
        return ResponseEntity.ok().build();
    }

	@Override
	public ResponseEntity<?> getUserAnnounces(String ownerId) {
		List<Announcement> announces = announcementService.getAnnouncementByOwnerId(ownerId);
		return ResponseEntity.ok().body(announces);
	}



	@Override
	public ResponseEntity<?> saveUserProfile(MultipartFile file, String userStr) {
		
		return ResponseEntity.accepted().body(userService.saveUserProfile(file, userStr));
		
	}

}

