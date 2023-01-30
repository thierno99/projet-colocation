package com.gocoloc.backend.domain;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.ManyToAny;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Document("users")
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String id;
    private String lastname;
    private String firstname;
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
    @ManyToAny(fetch = FetchType.EAGER)
    private Set<Role> roles = new HashSet<>();

    public User(
        String lastname, 
        String firstname, 
        String sexe, 
        LocalDateTime dateOfBirth, 
        String email, 
        String password,
        boolean isEmailVerified, 
        boolean iscertified, 
        byte[] profileImg, 
        boolean autorizeHaldleTel,
        boolean autorizeHaldleEmail,
        Set<Role> roles
    ) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.sexe = sexe;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.password = password;
        this.isEmailVerified = isEmailVerified;
        this.iscertified = iscertified;
        this.profileImg = profileImg;
        this.autorizeHaldleTel = autorizeHaldleTel;
        this.autorizeHaldleEmail = autorizeHaldleEmail;
        this.roles = roles;
    }
}
