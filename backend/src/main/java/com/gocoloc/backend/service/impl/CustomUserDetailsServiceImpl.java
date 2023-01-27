package com.gocoloc.backend.service.impl;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.gocoloc.backend.domain.User;
import com.gocoloc.backend.repository.UserRepository;
import com.gocoloc.backend.service.CustomUserDetail;
import com.gocoloc.backend.service.CustomUserDetailsService;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
public class CustomUserDetailsServiceImpl  implements CustomUserDetailsService{
    @Autowired    
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        log.info(("-------------------------------------------------------------------------------------------------------------Try to login User -----------------------------------------------------------------------"));
        if(user == null) {
            log.error("User " + username + " not found");
            throw new UsernameNotFoundException("User " + username + " not found");
        } else {
            log.info("User {} with pwd= {} is founded",username, user.getPassword());
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        //return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
        return new CustomUserDetail(user);
    }
}
