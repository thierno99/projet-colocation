package com.gocoloc.backend.service.impl;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
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
public class UserServiceImpl implements UserService{

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final RoleRepository roleRepository;
    
    @Autowired
    private final PasswordEncoder passwordEncoder;
    
    @Autowired
    private final AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtGenerator jwtGenerator;

    @Override
    public User SaveUser(User user) {
        log.info("Saving User to the Database");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User createdUser = userRepository.save(user);
        addRoleToUser(createdUser.getEmail(), "USER");
        return createdUser;
    }
    
    @Override
	public Optional<User> getUserById(String userId) {
    	
		return userRepository.findById(userId);
	}

	@Override
	public User updateUser(User user) {
		return userRepository.save(user);
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
    public void addRoleToUserById(String id, String roleName) {
        Optional<User> userOpt = userRepository.findById(id);
        if(!userOpt.isEmpty()) {
        	User user = userOpt.get();
			Role role = roleRepository.findByName(roleName);
        	user.getRoles().add(role);
        	userRepository.save(user);
        	log.info("Adding Role {} to the User {}", role.getName(), user.getLastname()+' '+user.getFirstname());
        }
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
    public boolean existsByuserEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public AuthResponseDto loginUser(LoginDto login) {
        log.info("a user is trying to log in {}", login);
        User user = userRepository.findByEmail(login.getEmail());
       
            Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
            user.getRoles().forEach(role -> {
                authorities.add(new SimpleGrantedAuthority(role.getName()));
            });
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword(),authorities)); 
            SecurityContextHolder.getContext().setAuthentication(authentication);
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token;
			try {
				token = jwtGenerator.generateToken(authentication);
				log.info("token ====>", token);
				return new AuthResponseDto(token, "loged in", user.getId(), user.getLastname());
			} catch (Exception e) {
				e.printStackTrace();
				throw e;
			}
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

	@Override
	public User saveUserProfile(MultipartFile file, String userStr) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.registerModule(new JavaTimeModule());
			log.info(userStr);
			User user = objectMapper.readValue(userStr, User.class);
			user.setProfileImg(file.getBytes());	
	        return updateUser(user);
	        
		} catch (Exception e) {
			log.error(e.getMessage());
			return new User();
		}
	}
}
