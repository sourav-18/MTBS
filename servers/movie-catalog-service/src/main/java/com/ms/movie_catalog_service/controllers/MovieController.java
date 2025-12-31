package com.ms.movie_catalog_service.controllers;

import com.ms.movie_catalog_service.dto.*;
import com.ms.movie_catalog_service.dto.validators.MovieCreateValidator;
import com.ms.movie_catalog_service.service.MovieActorService;
import com.ms.movie_catalog_service.service.MovieService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.groups.Default;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
@CrossOrigin
public class MovieController {

    private final MovieService movieService;
    private final MovieActorService movieActorService;

    @PostMapping
    public Map<String,Object> create(HttpServletRequest request, @Validated({Default.class, MovieCreateValidator.class}) @RequestBody MovieRequestDto movieRequestDto){
        Integer userId=(Integer) request.getAttribute("user-id");
        return movieService.create(movieRequestDto,userId);
    }

    @GetMapping
    public Map<String,Object> list(@Valid @ModelAttribute MovieListQueryDto movieListQueryDto){
        return movieService.list(movieListQueryDto);
    }
    @GetMapping("/{movieId}")
    public Map<String,Object> details(@PathVariable("movieId") Integer movieId){
        return movieService.details(movieId);
    }

    @PutMapping("/{movieId}")
    public Map<String,Object> update(HttpServletRequest request,@PathVariable("movieId") Integer
            movieId,@Validated({Default.class}) @RequestBody MovieRequestDto movieRequestDto){
        Integer userId=(Integer) request.getAttribute("user-id");
        return movieService.update(movieId,userId,movieRequestDto);
    }

    @GetMapping("/{movieId}/actors")
    public Map<String,Object> getMovieActors(@PathVariable("movieId") Integer movieId){
        return movieActorService.getMovieActors(movieId);
    }

    @PatchMapping("/{movieId}/actors/add")
    public Map<String,Object> addMovieActor(@PathVariable("movieId") Integer movieId,@RequestBody MovieActorUpdateDto movieActorUpdateDto){
        return movieActorService.addMovieActor(movieId,movieActorUpdateDto);
    }

    @Transactional
    @PatchMapping("/{movieId}/actors/remove")
    public Map<String,Object> removeMovieActor(@PathVariable("movieId") Integer movieId,@RequestBody MovieActorUpdateDto movieActorUpdateDto){
        return movieActorService.removeMovieActor(movieId,movieActorUpdateDto);
    }

}
