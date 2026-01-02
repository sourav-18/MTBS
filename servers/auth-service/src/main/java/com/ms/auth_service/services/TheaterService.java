package com.ms.auth_service.services;

import com.ms.auth_service.Repository.TheaterRepository;
import com.ms.auth_service.dtos.TheaterRequestDto;
import com.ms.auth_service.entity.TheaterEntity;
import com.ms.auth_service.mapper.TheaterMapper;
import com.ms.auth_service.utils.ResponseUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class TheaterService {

    private final TheaterRepository theaterRepository;

    public Map<String, Object> create(TheaterRequestDto theaterRequestDto){
        if(!theaterRequestDto.getPassword().equals(theaterRequestDto.getConfirmPassword())){
            return ResponseUtils.sendError("password and confirmPassword should be match", null);
        }
        TheaterEntity theaterEntity= TheaterMapper.toEntity(theaterRequestDto);
        theaterRepository.save(theaterEntity);
        return ResponseUtils.sendSuccess("Theater create successfully", null);
    }
}
