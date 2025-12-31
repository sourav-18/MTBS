package com.ms.movie_catalog_service.mapper;


import com.ms.movie_catalog_service.dto.ActorResponseDto;
import com.ms.movie_catalog_service.dto.MovieActorResponseDto;
import com.ms.movie_catalog_service.entity.ActorEntity;
import com.ms.movie_catalog_service.entity.MovieActorEntity;

import java.util.List;

public class MovieActorMapper {

    public static MovieActorResponseDto toDto(MovieActorEntity movieActorEntity){
        MovieActorResponseDto movieActorResponseDto=new MovieActorResponseDto();
        movieActorResponseDto.setMovieId(movieActorEntity.getMovie().getId());
        movieActorResponseDto.setActorId(movieActorEntity.getActor().getId());
        movieActorResponseDto.setActorName(movieActorEntity.getActor().getName());
        movieActorResponseDto.setActorGender(movieActorEntity.getActor().getGender());
        movieActorResponseDto.setActorProfilePicture(movieActorEntity.getActor().getProfilePicture());
        return movieActorResponseDto;
    }

    public static List<MovieActorResponseDto> toListDto(List<MovieActorEntity>movieActor){
        return movieActor.stream().map(MovieActorMapper::toDto).toList();
    }
}
