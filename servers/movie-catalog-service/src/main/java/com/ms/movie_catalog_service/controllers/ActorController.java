package com.ms.movie_catalog_service.controllers;

import com.ms.movie_catalog_service.dto.ActorListQueryDto;
import com.ms.movie_catalog_service.dto.ActorRequestDto;
import com.ms.movie_catalog_service.entity.type.ActorStatusType;
import com.ms.movie_catalog_service.service.ActorService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/actors")
@RequiredArgsConstructor
@CrossOrigin
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

    @PutMapping("/{actorId}")
    public Map<String,Object> update(@PathVariable("actorId") Integer actorId,@Valid @RequestBody ActorRequestDto actorRequestDto){
        return actorService.update(actorId,actorRequestDto);
    }

    @PatchMapping("/{actorId}/status/{status}")
    public Map<String,Object> update(@PathVariable("actorId") Integer actorId,@PathVariable("status") ActorStatusType status){
        return actorService.statusUpdate(actorId,status);
    }

    @GetMapping("/count-details")
    public Map<String,Object> getTotalActorCountDetails(@RequestParam(value = "search",required = false) String search){
        return actorService.getTotalActorCountDetails(search);
    }

    @GetMapping("/list-for-select")
    public Map<String,Object> listForSelect(@RequestParam(value = "search",required = false) String search){
        return actorService.listForSelect(search);
    }





}
