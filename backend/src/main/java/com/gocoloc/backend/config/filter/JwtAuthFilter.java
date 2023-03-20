package com.gocoloc.backend.config.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.gocoloc.backend.config.jwt.JwtGenerator;
import com.gocoloc.backend.service.CustomUserDetailsService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtAuthFilter extends OncePerRequestFilter{
    
    @Autowired
    private JwtGenerator tokenGenerator;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
        throws ServletException, IOException 
    {
        String token = getJwtFromRequest(request);

        if(StringUtils.hasText(token)) {
            String username = tokenGenerator.getUsernameFromJwt(token);
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
            
            if(tokenGenerator.isValidateToken(userDetails,token)) {
            	UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());
            	
            	authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            	SecurityContext context = SecurityContextHolder.createEmptyContext();
            	context.setAuthentication(authenticationToken);
            	SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            	SecurityContextHolder.setContext(context);
            	filterChain.doFilter(request,response);
            	
            }
            
        } else {
        	log.info("no token {}",request.getParameterNames());
        	filterChain.doFilter(request,response);        	
        }
        
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }
    
}
