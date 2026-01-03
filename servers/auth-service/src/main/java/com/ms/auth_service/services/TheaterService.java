package com.ms.auth_service.services;

import com.ms.auth_service.Repository.TheaterRepository;
import com.ms.auth_service.dtos.ForgetPasswordDto;
import com.ms.auth_service.dtos.TheaterLoginRequestDto;
import com.ms.auth_service.dtos.TheaterSignupRequestDto;
import com.ms.auth_service.entity.TheaterEntity;
import com.ms.auth_service.mapper.TheaterMapper;
import com.ms.auth_service.utils.ResponseUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class TheaterService {

    private final TheaterRepository theaterRepository;
    private final OtpService otpService;

    public Map<String, Object> signup(TheaterSignupRequestDto theaterSignupRequestDto) {
        //todo password should be store in hash format in db
        if (!theaterSignupRequestDto.getPassword().equals(theaterSignupRequestDto.getConfirmPassword()))
            return ResponseUtils.sendError("password and confirmPassword should be match", null);

        if (theaterRepository.isPresent(theaterSignupRequestDto.getEmail()) != null)
            return ResponseUtils.sendError("Theater already exist", null);

        if (!otpService.verify(theaterSignupRequestDto.getOtpId(), theaterSignupRequestDto.getOtp(), theaterSignupRequestDto.getEmail()))
            return ResponseUtils.sendError("Invalid otp", null);

        TheaterEntity theaterEntity = TheaterMapper.toEntity(theaterSignupRequestDto);
        theaterRepository.save(theaterEntity);

        return ResponseUtils.sendSuccess("Theater signup successfully", null);
    }

    public Map<String, Object> login(TheaterLoginRequestDto theaterLoginRequestDto){
        TheaterEntity theaterEntity= theaterRepository.findByEmail(theaterLoginRequestDto.getEmail());
        if(theaterEntity==null||!theaterEntity.getPassword().equals(theaterLoginRequestDto.getPassword()))
            return ResponseUtils.sendError("Theater not found", null);

        return ResponseUtils.sendSuccess("Theater Login successfully", null);
    }

    @Transactional
    public Map<String, Object> forgetPassword(ForgetPasswordDto forgetPasswordDto){
        if (!forgetPasswordDto.getPassword().equals(forgetPasswordDto.getConfirmPassword()))
            return ResponseUtils.sendError("password and confirmPassword should be match", null);

        if (!otpService.verify(forgetPasswordDto.getOtpId(), forgetPasswordDto.getOtp(), forgetPasswordDto.getEmail()))
            return ResponseUtils.sendError("Invalid otp", null);

        TheaterEntity theaterEntity=theaterRepository.findByEmail(forgetPasswordDto.getEmail());
        if(theaterEntity==null)return ResponseUtils.sendSuccess("Theater not exist", null);

        theaterEntity.setPassword(forgetPasswordDto.getPassword());

        theaterRepository.save(theaterEntity);

        return ResponseUtils.sendSuccess("forget password successfully", null);
    }

    public Map<String, Object> isPresent(String email) {
        Integer id = theaterRepository.isPresent(email);
        boolean isPresent = id != null;
        return ResponseUtils.sendSuccess("Theater present data", isPresent);
    }



}
