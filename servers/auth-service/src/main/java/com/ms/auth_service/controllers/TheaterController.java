package com.ms.auth_service.controllers;

import com.ms.auth_service.services.TheaterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/theaters")
@RequiredArgsConstructor
public class TheaterController {

    private final TheaterService theaterService;

    @GetMapping("/")
    public Map<String, Object> isPresent(@RequestParam("email") String email){
        return theaterService.isPresent(email);
    }

}
