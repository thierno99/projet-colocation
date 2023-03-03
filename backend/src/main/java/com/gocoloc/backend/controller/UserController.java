package com.gocoloc.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.gocoloc.backend.domain.Role;
import com.gocoloc.backend.domain.User;
import com.gocoloc.backend.domain.dto.AuthResponseDto;
import com.gocoloc.backend.domain.dto.LoginDto;

import lombok.Data;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auth")
public interface UserController {
    @GetMapping("/user/views")
    public ResponseEntity<List<User>> getUsers();
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable String userId);

    @PostMapping("/user/register")
    public ResponseEntity<?> saveUser(@RequestBody User user);
    
    @PutMapping("/user/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable String userId,@RequestBody User user);

    @PostMapping("/user/login")
    public ResponseEntity<AuthResponseDto> loginUser(@RequestBody LoginDto login);

    @PostMapping("/role/save")
    public ResponseEntity<Role> saveRole(@RequestBody Role role);

    @PostMapping("/role/addtouser")
    public ResponseEntity<?> addRoleToUser(RoleToUserForm form);
    
    @GetMapping("/user/announces/{ownerId}")
    public ResponseEntity<?> getUserAnnounces(@PathVariable String ownerId);
    
    @PostMapping("/user/saveprofile")
	public ResponseEntity<?> saveUserProfile(@RequestParam("profile") MultipartFile file, @RequestParam("user") String userStr);

    @Data 
    class RoleToUserForm {
        private String email;
        private String roleName;
    }

}
