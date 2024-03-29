package com.gocoloc.backend.config;

import java.io.File;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.gocoloc.backend.constants.AnnounceType;
import com.gocoloc.backend.constants.RoomType;
import com.gocoloc.backend.domain.Announcement;
import com.gocoloc.backend.domain.Role;
import com.gocoloc.backend.domain.User;
import com.gocoloc.backend.repository.RoleRepository;
import com.gocoloc.backend.service.AnnouncementService;
import com.gocoloc.backend.service.UserService;

@Configuration
public class ApplicationConfig {
    
//    private static final String SRC_MAIN = "/src/main";
//	private static final String HELLO_WORLD = "hello world";
	private static final String ADMIN = "ADMIN";
	private static final String MANAGER = "MANAGER";
	private static Logger log = LoggerFactory.getLogger("ApplicationConfig");
    
    @Bean
    public CommandLineRunner runner(UserService userService, AnnouncementService announcementService, RoleRepository roleRepository) {
        return (args) -> {
        	
        	List<Role> roles = roleRepository.findAll();
        	if(roles.isEmpty()) {
        		userService.saveRole(new Role("USER"));
        		userService.saveRole(new Role(MANAGER));
        		userService.saveRole(new Role(ADMIN));        		
        	}
            
            
//        	List<User> users = userService.getUsers();
//        	
//            if(users.isEmpty()){
//
//                userService.saveRole(new Role("USER"));
//                userService.saveRole(new Role(MANAGER));
//                userService.saveRole(new Role(ADMIN));
//
//                User user = new User(
//                    "bon",
//                    "jean", 
//                    "M", 
//                    LocalDate.parse("2022-02-16"), 
//                    "123456789",
//                    "user1@gmail.com", 
//                    "user1Password!", 
//                    true, 
//                    true, 
//                    HELLO_WORLD.getBytes(), 
//                    true, 
//                    true,
//                    new HashSet<>(Arrays.asList(userService.getRoleByNaRole("USER"))) 
//                );
//
//                User user2 = new User(
//                    "leturque",
//                    "biensuristic", 
//                    "M", 
//                    LocalDate.parse("1996-09-11"),  
//                    "123456789",
//                    "user2@gmail.com", 
//                    "user2PassWord!", 
//                    true, 
//                    true,
//                    HELLO_WORLD.getBytes(), 
//                    true, 
//                    true, 
//                    new HashSet<>(Arrays.asList(userService.getRoleByNaRole("USER")))
//                );
//
//                User user3 = new User(
//                    "rapon",
//                    "jacky", 
//                    "M", 
//                    LocalDate.parse("1996-09-11"),  
//                    "123456789",
//                    "user3@gmail.com", 
//                    "user3PassWord!", 
//                    true, 
//                    true, 
//                    HELLO_WORLD.getBytes(), 
//                    true, 
//                    true, 
//                    new HashSet<>(Arrays.asList(new Role(MANAGER)))
//                );
//
//                User user4 = new User(
//                    "ponzy",
//                    "laurent", 
//                    "M", 
//                    LocalDate.parse("1986-09-11"),  
//                    "123456789",
//                    "user4@gmail.com", 
//                    "user4PassWord!", 
//                    false, 
//                    false, 
//                    HELLO_WORLD.getBytes(), 
//                    false, 
//                    false, 
//                    new HashSet<>(Arrays.asList(userService.getRoleByNaRole("USER")))
//                );
//
//                User user5 = new User(
//                    "ponzy",
//                    "laurent", 
//                    "M", 
//                    LocalDate.parse("1986-09-11"),  
//                    "123456789",
//                    "user5@gmail.com", 
//                    "user5PassWord!", 
//                    false, 
//                    false, 
//                    (new File("file", SRC_MAIN)).getAbsolutePath().getBytes(), 
//                    false, 
//                    false,
//                    new HashSet<>(Arrays.asList(userService.getRoleByNaRole("USER")))
//                );
//
//                log.info("---------------------------Project Init with The Following Mock User: ------------------------");
//
//                userService.SaveUser(user);
//                userService.SaveUser(user2);
//                userService.SaveUser(user3);
//                userService.SaveUser(user4);
//                userService.SaveUser(user5);
//
//                userService.addRoleToUser(user4.getEmail(), MANAGER);
//                userService.addRoleToUser(user4.getEmail(), ADMIN);
//                userService.addRoleToUser(user.getEmail(), MANAGER);
//                userService.addRoleToUser(user3.getEmail(), ADMIN);
//            }
//            
//            
//            if(announcementService.getAnnouncements().isEmpty() && !users.isEmpty()) {
//            	
//            	log.info("---------------------------Project Init with The Following Mock Announcement: ------------------------");
//            	
//            	Announcement announce1 = new Announcement(
//            			"Je recherche des colocataires", 
//            			"Je dispose d'une maison de 6 chambres, un living room, dont chaque chambre dispose sa salle de bain et toilettes, 2 cuisines à partagerpar paire de 2.", 
//            			users.get(0).getId(),
//            			"Nouvelle Aquitaine",
//            			"Bordeaux", 
//            			"33000", 
//            			"12 cours de la martinique", 
//            			6, 
//            			LocalDateTime.parse("2023-01-11T10:12:15"),
//            			650, 
//            			AnnounceType.HAVEROOM, 
//            			true, 
//            			RoomType.MAISON, 
//            			true,
//            			new HashSet<>(Arrays.asList("homme", "femme"))
//            			
//            	);
//            	
//            	Announcement announce2 = new Announcement(
//            			"Je recherche des colocs", 
//            			"Je dispose d'une maison de 6 chambres, un living room, dont chaque chambre dispose sa salle de bain et toilettes, 2 cuisines à partagerpar paire de 2.", 
//            			users.get(0).getId(),
//            			"Nouvelle Aquitaine",
//            			"Bordeaux", 
//            			"33000", 
//            			"12 cours de la martinique", 
//            			6, 
//            			LocalDateTime.parse("2023-01-11T10:12:15"),
//            			650, 
//            			AnnounceType.HAVEROOM, 
//            			true, 
//            			RoomType.APPARTEMENT, 
//            			true,
//            			new HashSet<>(Arrays.asList("homme", "femme"))
//            			
//            	);
//            	
//            	
//            	Announcement announce3 = new Announcement(
//            			"Je recherche un coloc", 
//            			"Je dispose d'une maison de 6 chambres, un living room, dont chaque chambre dispose sa salle de bain et toilettes, 2 cuisines à partagerpar paire de 2.", 
//            			users.get(0).getId(),
//            			"Nouvelle Aquitaine",
//            			"Bordeaux", 
//            			"33000", 
//            			"12 cours de la martinique", 
//            			6, 
//            			LocalDateTime.parse("2023-01-11T10:12:15"),
//            			650, 
//            			AnnounceType.HAVEROOM, 
//            			true, 
//            			RoomType.STUDIO, 
//            			true,
//            			new HashSet<>(Arrays.asList("femme"))
//            			
//            	);
//            	
//            	Announcement announce4 = new Announcement(
//            			"Je recherche un coloc", 
//            			"Je dispose d'une maison de 6 chambres, un living room, dont chaque chambre dispose sa salle de bain et toilettes, 2 cuisines à partagerpar paire de 2.", 
//            			users.get(0).getId(),
//            			"Nouvelle Aquitaine",
//            			"Bordeaux", 
//            			"33000", 
//            			"12 cours de la martinique", 
//            			6, 
//            			LocalDateTime.parse("2023-01-11T10:12:15"),
//            			650, 
//            			AnnounceType.HAVEROOM, 
//            			true, 
//            			RoomType.MAISON, 
//            			true,
//            			new HashSet<>(Arrays.asList("homme"))
//            			
//            	);
//            	
//            	
//            	announcementService.saveAnnounce(announce1);
//            	announcementService.saveAnnounce(announce2);
//            	announcementService.saveAnnounce(announce3);
//            	announcementService.saveAnnounce(announce4);
//            	
//            }



        };
    }
}
