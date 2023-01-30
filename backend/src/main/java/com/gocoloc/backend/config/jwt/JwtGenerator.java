package com.gocoloc.backend.config.jwt;


import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.security.Key;

import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.gocoloc.backend.constants.SecurityConstant;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtGenerator {
	private Key key;
	
	@PostConstruct
	public void init() {
		key = Keys.hmacShaKeyFor(SecurityConstant.JWT_SECRET.getBytes());
	}
    
    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        Date currentDate = new Date();
        Date expirationDate = new Date(currentDate.getTime() + SecurityConstant.JWT_EXPIRATION);
        
        return Jwts.builder()
            .setSubject(username)
            .addClaims(buildClaims(username))
            //.setIssuedAt(currentDate)
            .setExpiration(expirationDate)
            .signWith(key, SignatureAlgorithm.HS512)
            .compact()
        ;
    }
    
    
    private Map<String, Object> buildClaims(String username){
    	Map<String, Object> claims = new HashMap<>();
    	if(username != null) {
    		claims.put("email", username);
    	}
    	return claims;	
    }

    public String getUsernameFromJwt(String token) {
    	JwtParser parser = Jwts.parserBuilder().setSigningKey(key).build();
    	Claims claims = parser.parseClaimsJws(token)
        	  .getBody()
        ;
        
        return claims.getSubject();
    }

    public boolean isValidateToken(UserDetails user, String token) {
        try {
        	JwtParser parser = Jwts.parserBuilder().setSigningKey(key).build();
            parser.parseClaimsJws(token);
            
            String username = this.getUsernameFromJwt(token);
            
            return user.getUsername().equals(username) && !isExpiredToken(token);
        } catch (Exception e) {
            throw new AuthenticationCredentialsNotFoundException("JWT was expired or incorrect");
        }
    }
    
    public <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {
    	final Claims claims = extractAllClaims(token);
    	
    	return claimsResolver.apply(claims);
    }

	private boolean isExpiredToken(String token) {
	
		return extractExpiration(token).before(new Date());
	}

	private Date extractExpiration(String token) {
		return extractClaims(token, Claims::getExpiration);
	}

	private Claims extractAllClaims(String token) {
		
		return Jwts
				.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(token)
				.getBody()
		;
	}


}
