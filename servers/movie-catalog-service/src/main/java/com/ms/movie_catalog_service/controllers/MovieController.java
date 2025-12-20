package com.ms.movie_catalog_service.controllers;

import com.ms.movie_catalog_service.dto.ActorRequestDto;
import com.ms.movie_catalog_service.dto.MovieRequestDto;
import com.ms.movie_catalog_service.dto.MovieResponseDto;
import com.ms.movie_catalog_service.service.MovieService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @PostMapping
    public Map<String,Object> create(HttpServletRequest request, @Valid @RequestBody MovieRequestDto movieRequestDto){
        Integer userId=(Integer) request.getAttribute("user-id");
        return movieService.create(movieRequestDto,userId);
    }

}
