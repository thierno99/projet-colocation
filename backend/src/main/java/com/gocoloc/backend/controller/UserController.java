package com.gocoloc.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import com.gocoloc.backend.domain.Role;
import com.gocoloc.backend.domain.User;
import com.gocoloc.backend.domain.dto.AuthResponseDto;
import com.gocoloc.backend.domain.dto.LoginDto;

import lombok.Data;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api/auth")
public interface UserController {
    @GetMapping("/user/views")
    public ResponseEntity<List<User>> getUsers();

    @PostMapping("/user/register")
    public ResponseEntity<?> saveUser(@RequestBody User user);

    @PostMapping("/user/login")
    public ResponseEntity<AuthResponseDto> loginUser(@RequestBody LoginDto login);

    @PostMapping("/role/save")
    public ResponseEntity<Role> saveRole(@RequestBody Role role);

    @PostMapping("/role/addtouser")
    public ResponseEntity<?> addRoleToUser(RoleToUserForm form);


    @Data 
    class RoleToUserForm {
        private String email;
        private String roleName;
    }

}
