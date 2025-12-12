package com.ms.movie_catalog_service.mapper;

import com.ms.movie_catalog_service.dto.ActorRequestDto;
import com.ms.movie_catalog_service.entity.ActorEntity;

public class ActorMapper {

    public static ActorEntity toModel(ActorRequestDto actorRequestDto){
        ActorEntity actorEntity=new ActorEntity();
        actorEntity.setName(actorRequestDto.getName());
        actorEntity.setProfilePicture(actorRequestDto.getProfilePicture());
        actorEntity.setGender(actorRequestDto.getGender());
        return  actorEntity;
    }
}
