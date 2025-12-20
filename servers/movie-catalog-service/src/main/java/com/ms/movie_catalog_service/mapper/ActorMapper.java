package com.ms.movie_catalog_service.mapper;

import com.ms.movie_catalog_service.dto.ActorRequestDto;
import com.ms.movie_catalog_service.dto.ActorResponseDto;
import com.ms.movie_catalog_service.entity.ActorEntity;

public class ActorMapper {

    public static ActorEntity toEntity(ActorRequestDto actorRequestDto){
        ActorEntity actorEntity=new ActorEntity();
        actorEntity.setName(actorRequestDto.getName());
        actorEntity.setProfilePicture(actorRequestDto.getProfilePicture());
        actorEntity.setGender(actorRequestDto.getGender());
        return  actorEntity;
    }

    public static ActorResponseDto toDto(ActorEntity actorEntity){
        return new ActorResponseDto(actorEntity.getId(),
                actorEntity.getName(),
                actorEntity.getGender(),
                actorEntity.getProfilePicture());
    }

}
