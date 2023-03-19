package com.gocoloc.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.gocoloc.backend.domain.Role;
import com.gocoloc.backend.domain.User;
import com.gocoloc.backend.domain.dto.AuthResponseDto;
import com.gocoloc.backend.domain.dto.LoginDto;

public interface UserService {
    User SaveUser(User user);
    Optional<User> getUserById(String userId);
    User updateUser(User user);
    User getUserByEmail(String email);
    
    Role saveRole(Role role);
    Role getRoleByNaRole(String name);
    
    void addRoleToUser(String email, String roleName);
    void addRoleToUserById(String id, String roleName);
    
    boolean existsByuserEmail(String email);
    
    List<User> getUsers();

    AuthResponseDto loginUser(LoginDto login);
    
    public User saveUserProfile(MultipartFile file, String userStr);
}
