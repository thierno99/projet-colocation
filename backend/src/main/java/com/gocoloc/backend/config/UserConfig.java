package com.gocoloc.backend.config;

import java.io.File;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashSet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.gocoloc.backend.domain.Role;
import com.gocoloc.backend.domain.User;
import com.gocoloc.backend.service.UserService;

@Configuration
public class UserConfig {
    
    private static final String SRC_MAIN = "/src/main";
	private static final String HELLO_WORLD = "hello world";
	private static final String ADMIN = "ADMIN";
	private static final String MANAGER = "MANAGER";
	private static Logger log = LoggerFactory.getLogger("UserConfig");
    
    @Bean
    public CommandLineRunner runner(UserService userService) {
        return (args) -> {
            if(userService.getUsers().isEmpty()){

                userService.saveRole(new Role("USER"));
                userService.saveRole(new Role(MANAGER));
                userService.saveRole(new Role(ADMIN));

                User user = new User(
                    "bon",
                    "jean", 
                    "M", 
                    LocalDateTime.parse("2022-02-16T10:22:15"), 
                    "user1@gmail.com", 
                    "user1Password!", 
                    true, 
                    true, 
                    HELLO_WORLD.getBytes(), 
                    true, 
                    true,
                    new HashSet<>(Arrays.asList(userService.getRoleByNaRole("USER"))) 
                );

                User user2 = new User(
                    "leturque",
                    "biensuristic", 
                    "M", 
                    LocalDateTime.parse("1996-09-11T10:22:15"), 
                    "user2@gmail.com", 
                    "user2PassWord!", 
                    true, 
                    true,
                    HELLO_WORLD.getBytes(), 
                    true, 
                    true, 
                    new HashSet<>(Arrays.asList(userService.getRoleByNaRole("USER")))
                );

                User user3 = new User(
                    "rapon",
                    "jacky", 
                    "M", 
                    LocalDateTime.parse("1996-09-11T10:22:15"), 
                    "user3@gmail.com", 
                    "user3PassWord!", 
                    true, 
                    true, 
                    HELLO_WORLD.getBytes(), 
                    true, 
                    true, 
                    new HashSet<>(Arrays.asList(new Role(MANAGER)))
                );

                User user4 = new User(
                    "ponzy",
                    "laurent", 
                    "M", 
                    LocalDateTime.parse("1986-09-11T10:22:15"), 
                    "user4@gmail.com", 
                    "user4PassWord!", 
                    false, 
                    false, 
                    HELLO_WORLD.getBytes(), 
                    false, 
                    false, 
                    new HashSet<>(Arrays.asList(userService.getRoleByNaRole("USER")))
                );

                User user5 = new User(
                    "ponzy",
                    "laurent", 
                    "M", 
                    LocalDateTime.parse("1986-09-11T10:22:15"), 
                    "user5@gmail.com", 
                    "user5PassWord!", 
                    false, 
                    false, 
                    (new File("file", SRC_MAIN)).getAbsolutePath().getBytes(), 
                    false, 
                    false,
                    new HashSet<>(Arrays.asList(userService.getRoleByNaRole("USER")))
                );

                log.info("---------------------------Project Init with The Following Mock User: ------------------------");

                userService.SaveUser(user);
                userService.SaveUser(user2);
                userService.SaveUser(user3);
                userService.SaveUser(user4);
                userService.SaveUser(user5);

                userService.addRoleToUser(user4.getEmail(), MANAGER);
                userService.addRoleToUser(user4.getEmail(), ADMIN);
                userService.addRoleToUser(user.getEmail(), MANAGER);
                userService.addRoleToUser(user3.getEmail(), ADMIN);
            }



        };
    }
}
