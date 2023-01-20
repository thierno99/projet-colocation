package com.gocoloc.backend.config.jwt;


import java.util.Date;

import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.gocoloc.backend.constants.SecurityConstant;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtGenerator {
    
    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        Date currentDate = new Date();
        Date expirationDate = new Date(currentDate.getTime() + SecurityConstant.JWT_EXPIRATION);

        String token = Jwts.builder()
            .setSubject(username)
            .setIssuedAt(currentDate)
            .setExpiration(expirationDate)
            .signWith(SignatureAlgorithm.HS256, SecurityConstant.JWT_SECRET)
            .compact()
        ;

        return token;
    }

    public String getUsernameFromJwt(String token) {
        Claims claims = Jwts.parser()
            .setSigningKey(SecurityConstant.JWT_SECRET)
            .parseClaimsJws(token)
            .getBody()
        ;
        
        return claims.getSubject();
    }

    public boolean isValidateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SecurityConstant.JWT_SECRET).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            throw new AuthenticationCredentialsNotFoundException("JWT was expired or incorrect");
        }
    }


}
