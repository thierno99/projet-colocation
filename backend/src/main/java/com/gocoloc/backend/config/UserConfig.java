package com.gocoloc.backend.config;

import java.io.File;
import java.time.LocalDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.gocoloc.backend.domain.User;
import com.gocoloc.backend.repository.UserRepository;

@Configuration
public class UserConfig {

    private static Logger log = LoggerFactory.getLogger("UserConfig");
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Bean
    public CommandLineRunner runner(UserRepository repository) {
        return (args) -> {
            User user = new User(
                "bon",
                "jean", 
                "M", 
                LocalDateTime.parse("2022-02-16T10:22:15"), 
                "user1@gmail.com", 
                passwordEncoder.encode("user1Password!"), 
                true, 
                true, 
                "hello world".getBytes(), 
                true, 
                true
            );

            User user2 = new User(
                "leturque",
                "biensuristic", 
                "M", 
                LocalDateTime.parse("1996-09-11T10:22:15"), 
                "user2@gmail.com", 
                passwordEncoder.encode("user2PassWord!"), 
                true, 
                true,
                "hello world".getBytes(), 
                true, 
                true
            );

            User user3 = new User(
                "rapon",
                "jacky", 
                "M", 
                LocalDateTime.parse("1996-09-11T10:22:15"), 
                "user3@gmail.com", 
                passwordEncoder.encode("user3PassWord!"), 
                true, 
                true, 
                "hello world".getBytes(), 
                true, 
                true
            );

            User user4 = new User(
                "ponzy",
                "laurent", 
                "M", 
                LocalDateTime.parse("1986-09-11T10:22:15"), 
                "user4@gmail.com", 
                passwordEncoder.encode("user4PassWord!"), 
                false, 
                false, 
                "hello world".getBytes(), 
                false, 
                false
            );

            User user5 = new User(
                "ponzy",
                "laurent", 
                "M", 
                LocalDateTime.parse("1986-09-11T10:22:15"), 
                "user5@gmail.com", 
                passwordEncoder.encode("user5PassWord!"), 
                false, 
                false, 
                (new File("file", "/src/main")).getAbsolutePath().getBytes(), 
                false, 
                false
            );

            log.info("---------------------------Project Init with The Following Mock User: ------------------------");
            log.info("user1: " + user);
            log.info("user2: " + user2);
            log.info("user3: " + user3);
            log.info("user4: " + user4);
            log.info("user4: " + user5);
            log.info("user5 get ImageProfile: " + new String(user5.getProfileImg()));

            repository.insert(user);
            repository.insert(user2);
            repository.insert(user3);
            repository.insert(user4);
            repository.insert(user5);
        };
    }
}
