package com.gocoloc.backend.domain;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Data;
@Data
@Document("users")
public class User {
    @Id
    private String id;
    private String nom;
    private String prenom;
    private String sexe;
    private LocalDateTime dateOfBirth;
    @Indexed(unique = true)
    private String email;
    private String password;
    private boolean isEmailVerified;
    private boolean iscertified;
    @Lob
    private byte[] profileImg;
    private boolean autorizeHaldleTel;
    private boolean autorizeHaldleEmail;

    public User(
        String nom, 
        String prenom, 
        String sexe, 
        LocalDateTime dateOfBirth, 
        String email, 
        String password,
        boolean isEmailVerified, 
        boolean iscertified, 
        byte[] profileImg, 
        boolean autorizeHaldleTel,
        boolean autorizeHaldleEmail
    ) {
        this.nom = nom;
        this.prenom = prenom;
        this.sexe = sexe;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.password = password;
        this.isEmailVerified = isEmailVerified;
        this.iscertified = iscertified;
        this.profileImg = profileImg;
        this.autorizeHaldleTel = autorizeHaldleTel;
        this.autorizeHaldleEmail = autorizeHaldleEmail;
    }
}
