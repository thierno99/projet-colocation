package com.gocoloc.backend.service.impl;

// import java.util.ArrayList;
// import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gocoloc.backend.config.jwt.JwtGenerator;
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
public class UserServiceImpl implements UserService/*, UserDetailsService */ {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final RoleRepository roleRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private final AuthenticationManager authenticationManager;

    @Autowired
    JwtGenerator jwtGenerator;

    
    // @Override
    // public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    //     User user = userRepository.findByEmail(username);
    //     if(user == null) {
    //         log.error("User " + username + " not found");
    //         throw new UsernameNotFoundException("User " + username + " not found");
    //     } else {
    //         log.info("User " + username + " is founded");
    //     }
    //     Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
    //     user.getRoles().forEach(role -> {
    //         authorities.add(new SimpleGrantedAuthority(role.getName()));
    //     });
    //     return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    // }

    @Override
    public User SaveUser(User user) {
        log.info("Saving User to the Database");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
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
        log.info(("-------------------------------------------------------------------------------------------------------------Try to login User -----------------------------------------------------------------------"));
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword())); 
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        log.info("token ====>", token);
        return new AuthResponseDto(token);
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
