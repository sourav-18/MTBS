package com.ms.movie_catalog_service.mapper;

import com.ms.movie_catalog_service.dto.ActorRequestDto;
import com.ms.movie_catalog_service.dto.ActorResponseDto;
import com.ms.movie_catalog_service.dto.MovieResponseDto;
import com.ms.movie_catalog_service.entity.ActorEntity;
import com.ms.movie_catalog_service.entity.MovieEntity;

import java.util.List;

public class ActorMapper {

    public static ActorEntity toEntity(ActorRequestDto actorRequestDto){
        ActorEntity actorEntity=new ActorEntity();
        actorEntity.setName(actorRequestDto.getName());
        actorEntity.setProfilePicture(actorRequestDto.getProfilePicture());
        actorEntity.setGender(actorRequestDto.getGender());
        actorEntity.setDob(actorRequestDto.getDob());
        actorEntity.setNationality(actorRequestDto.getNationality());
        actorEntity.setRating(actorRequestDto.getRating());
        return  actorEntity;
    }

    public static ActorResponseDto toDto(ActorEntity actorEntity){
        return new ActorResponseDto(actorEntity.getId(),
                actorEntity.getName(),
                actorEntity.getGender(),
                actorEntity.getProfilePicture(),
                actorEntity.getDob(),
                actorEntity.getNationality(),
                actorEntity.getRating()
        );

    }

    public static List<ActorResponseDto> toListDto(List<ActorEntity>actors){
        return actors.stream().map(ActorMapper::toDto).toList();
    }

}
