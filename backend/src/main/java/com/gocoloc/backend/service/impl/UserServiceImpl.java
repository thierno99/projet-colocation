package com.gocoloc.backend.service.impl;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gocoloc.backend.domain.Role;
import com.gocoloc.backend.domain.User;
import com.gocoloc.backend.domain.dto.AuthResponseDto;
import com.gocoloc.backend.domain.dto.LoginDto;
import com.gocoloc.backend.repository.RoleRepository;
import com.gocoloc.backend.repository.UserRepository;
import com.gocoloc.backend.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService{

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final RoleRepository roleRepository;

    @Override
    public User SaveUser(User user) {
        log.info("Saving User to the Database");
        User createdUser = userRepository.save(user);
        addRoleToUser(createdUser.getEmail(), "USER");
        return createdUser;
    }

    @Override
    public void addRoleToUser(String email, String roleName) {
        User user = userRepository.findByEmail(email);
        Role role = roleRepository.findByName(roleName);
        user.getRoles().add(role);
        userRepository.save(user);
        log.info("Adding Role {} to the User {}", role.getName(), user.getLastname()+' '+user.getFirstname());
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<User> getUserLimit(int start, int end) {
        // TODO
        return null;
    }

    @Override
    public boolean existsByuserEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public AuthResponseDto loginUser(LoginDto login) {
        log.info("a user is trying to log in {}", login);
        User user = userRepository.findByEmail(login.getEmail());
        if(user!=null && user.getEmail().equals(login.getEmail()) && user.getPassword().equals(login.getPassword())) {
            return new AuthResponseDto("logged in");
        }
        return new AuthResponseDto("Incorrect username or password");
    }
    

    @Override
    public Role saveRole(Role role) {
        log.info("Saving Role {} to the Database", role.getName());
        return roleRepository.save(role);
    }
    @Override
    public Role getRoleByNaRole(String name) {
        
        return roleRepository.findByName(name);
    }


}
