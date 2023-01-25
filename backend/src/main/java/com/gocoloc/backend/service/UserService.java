package com.gocoloc.backend.service;

import java.util.List;

import com.gocoloc.backend.domain.Role;
import com.gocoloc.backend.domain.User;
import com.gocoloc.backend.domain.dto.AuthResponseDto;
import com.gocoloc.backend.domain.dto.LoginDto;

public interface UserService {
    User SaveUser(User user);
    User getUserByEmail(String email);
    
    Role saveRole(Role role);
    Role getRoleByNaRole(String name);
    
    void addRoleToUser(String email, String roleName);
    
    boolean existsByuserEmail(String email);
    
    List<User> getUsers();
    List<User> getUserLimit(int start, int end);

    AuthResponseDto loginUser(LoginDto login);
}
