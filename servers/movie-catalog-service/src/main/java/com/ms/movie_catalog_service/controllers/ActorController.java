package com.ms.movie_catalog_service.controllers;

import com.ms.movie_catalog_service.dto.ActorListQueryDto;
import com.ms.movie_catalog_service.dto.ActorRequestDto;
import com.ms.movie_catalog_service.service.ActorService;
import com.ms.movie_catalog_service.utils.ResponseUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/actors")
@RequiredArgsConstructor
public class ActorController {

    private final ActorService actorService;

    @PostMapping
    public Map<String,Object> create(HttpServletRequest request, @Valid @RequestBody ActorRequestDto actorRequestDto){
        Integer userId=(Integer) request.getAttribute("user-id");
        return actorService.create(actorRequestDto,userId);
    }

    @GetMapping
    public Map<String,Object> list(@Valid @ModelAttribute ActorListQueryDto actorListQueryDto){
        return actorService.list(actorListQueryDto);
    }

}
