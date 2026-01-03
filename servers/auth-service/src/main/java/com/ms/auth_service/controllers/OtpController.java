package com.ms.auth_service.controllers;

import com.ms.auth_service.dtos.OtpRequestDto;
import com.ms.auth_service.dtos.OtpVerifyRequestDto;
import com.ms.auth_service.services.OtpService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/otp")
@RequiredArgsConstructor
public class OtpController {

    private final OtpService otpService;

    @PostMapping("/send")
    public Map<String, Object>  send(@Valid @RequestBody OtpRequestDto otpRequestDto){
        return otpService.sendOtp(otpRequestDto);
    }
    @PostMapping("/verify")
    public Map<String, Object>  verify(@Valid @RequestBody OtpVerifyRequestDto otpVerifyRequestDto){
        return otpService.verifyOtp(otpVerifyRequestDto);
    }

}
