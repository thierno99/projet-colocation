package com.gocoloc.backend.controller.impl;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.gocoloc.backend.controller.UserController;
import com.gocoloc.backend.domain.Role;
import com.gocoloc.backend.domain.User;
import com.gocoloc.backend.domain.dto.AuthResponseDto;
import com.gocoloc.backend.domain.dto.LoginDto;
import com.gocoloc.backend.service.UserService;

import lombok.RequiredArgsConstructor;
@Controller
@RequiredArgsConstructor
public class UserControllerImpl implements UserController {
    @Autowired
    private UserService userService;

    @Override
    public ResponseEntity<List<User>> getUsers(){
        return ResponseEntity.ok().body(userService.getUsers());
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

}

