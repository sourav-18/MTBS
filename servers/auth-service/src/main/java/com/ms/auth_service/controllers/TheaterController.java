package com.ms.auth_service.controllers;

import com.ms.auth_service.dtos.TheaterRequestDto;
import com.ms.auth_service.services.TheaterService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/theaters")
@RequiredArgsConstructor
public class TheaterController {

    private final TheaterService theaterService;

    public Map<String, Object> create(@Validated @RequestBody TheaterRequestDto theaterRequestDto){
        return theaterService.create(theaterRequestDto);
    }
}
