package com.gocoloc.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.gocoloc.backend.config.filter.JwtAuthFilter;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	@Autowired
    private UserDetailsService userDetailsService;
	
	@Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
	
	@Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
        .csrf().disable()
        .exceptionHandling()
        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
        .and()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authorizeHttpRequests()
        .requestMatchers("/api/auth/**").permitAll()
        .requestMatchers("/api/message/**").permitAll()
        .requestMatchers("/api/roomate/**").permitAll()
        .requestMatchers("/api/candidacy/**").permitAll()
        .requestMatchers("/api/task/**").permitAll()
        .requestMatchers("/api/auth/user/**").permitAll()
        .requestMatchers("/api/auth/user/login").permitAll()
        .requestMatchers("/api/auth/user/register").permitAll()
        .requestMatchers("/api/announces/announce/**").permitAll()
        .requestMatchers("/api/announces/**").permitAll() 
        .requestMatchers("/api/announces/views").permitAll()  
        .requestMatchers("/api/announces/save").permitAll() 
        .anyRequest()
        .authenticated()
        ;
		http.addFilterBefore(jwtAuthFilter(), UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
 
	@Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration ) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
	
	
	
//	@Bean
//	public PasswordEncoder disablePassworddEncoder () {
//		return NoOpPasswordEncoder.getInstance();
//	}
	
	@Bean 
    public JwtAuthFilter jwtAuthFilter() {
        return new JwtAuthFilter();
    }
	
}
