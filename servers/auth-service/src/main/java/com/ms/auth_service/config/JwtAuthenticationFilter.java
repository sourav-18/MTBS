package com.ms.auth_service.config;

import com.ms.auth_service.Repository.TheaterRepository;
import com.ms.auth_service.entity.TheaterEntity;
import com.ms.auth_service.entity.types.UserRole;
import com.ms.auth_service.services.JwtService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

@RequiredArgsConstructor
@Configuration
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final TheaterRepository theaterRepository;
    @Override
    protected void doFilterInternal(
             HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        try{
            final String jwt = authHeader.substring(7);
            final String useId = jwtService.extractUsername(jwt);
            Object userData=null;
            String userRole= (String) jwtService.extractAllClaims(jwt).get("role");
            if(Objects.equals(userRole, UserRole.Theater.toString())){
                userData=theaterRepository.findById(Integer.parseInt(useId)).orElse(null);
            }

            if(userData!=null){
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userData,
                        null,
                        null
                );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }else {
                //todo it should be change to valid userDetails(admin,user,theater)
                filterChain.doFilter(request, response);
            }


        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}
