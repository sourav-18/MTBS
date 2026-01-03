package com.ms.auth_service.mapper;

import com.ms.auth_service.dtos.TheaterSignupRequestDto;
import com.ms.auth_service.dtos.TheaterResponseDto;
import com.ms.auth_service.entity.TheaterEntity;

public class TheaterMapper {

    public static TheaterEntity toEntity(TheaterSignupRequestDto theaterSignupRequestDto){
        TheaterEntity theaterEntity=new TheaterEntity();
        theaterEntity.setName(theaterSignupRequestDto.getName());
        theaterEntity.setEmail(theaterSignupRequestDto.getEmail());
        theaterEntity.setPassword(theaterSignupRequestDto.getPassword());
        theaterEntity.setProfilePicture(theaterSignupRequestDto.getProfilePicture());
        theaterEntity.setCity(theaterSignupRequestDto.getCity());
        return theaterEntity;
    }

    public static TheaterResponseDto toDto(TheaterEntity theaterEntity){
        TheaterResponseDto theaterResponseDto  =new TheaterResponseDto();
        theaterResponseDto.setName(theaterEntity.getName());
        theaterResponseDto.setEmail(theaterEntity.getEmail());
        theaterResponseDto.setPassword(theaterEntity.getPassword());
        theaterResponseDto.setProfilePicture(theaterEntity.getProfilePicture());
        theaterResponseDto.setCity(theaterEntity.getCity());
        theaterResponseDto.setVerificationStatus(theaterEntity.getVerificationStatus());
        return theaterResponseDto;
    }


}
