package com.ms.auth_service.controllers;

import com.ms.auth_service.dtos.ForgetPasswordDto;
import com.ms.auth_service.dtos.TheaterLoginRequestDto;
import com.ms.auth_service.dtos.TheaterSignupRequestDto;
import com.ms.auth_service.services.TheaterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class Auth {

    private final TheaterService theaterService;

    @PostMapping("/theaters/signup")
    public Map<String, Object> theaterSighup(@Valid @RequestBody TheaterSignupRequestDto theaterSignupRequestDto){
        return theaterService.signup(theaterSignupRequestDto);
    }

    @PostMapping("/theaters/login")
    public Map<String, Object> theaterLogin(@Valid @RequestBody TheaterLoginRequestDto theaterLoginRequestDto){
        return theaterService.login(theaterLoginRequestDto);
    }

    @PostMapping("/theaters/forget-password")
    public Map<String, Object> theaterForgetPassword(@Valid @RequestBody ForgetPasswordDto forgetPasswordDto){
        return theaterService.forgetPassword(forgetPasswordDto);
    }

}
