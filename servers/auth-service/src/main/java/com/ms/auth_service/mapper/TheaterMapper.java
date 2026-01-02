package com.ms.auth_service.mapper;

import com.ms.auth_service.dtos.TheaterRequestDto;
import com.ms.auth_service.dtos.TheaterResponseDto;
import com.ms.auth_service.entity.TheaterEntity;

public class TheaterMapper {

    public static TheaterEntity toEntity(TheaterRequestDto theaterRequestDto){
        TheaterEntity theaterEntity=new TheaterEntity();
        theaterEntity.setName(theaterRequestDto.getName());
        theaterEntity.setEmail(theaterRequestDto.getEmail());
        theaterEntity.setPassword(theaterRequestDto.getPassword());
        theaterEntity.setProfilePicture(theaterRequestDto.getProfilePicture());
        theaterEntity.setCity(theaterRequestDto.getCity());
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
