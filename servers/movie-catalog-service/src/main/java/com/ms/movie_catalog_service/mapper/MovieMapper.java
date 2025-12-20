package com.ms.movie_catalog_service.mapper;

import com.ms.movie_catalog_service.dto.MovieRequestDto;
import com.ms.movie_catalog_service.dto.MovieResponseDto;
import com.ms.movie_catalog_service.entity.ActorEntity;
import com.ms.movie_catalog_service.entity.MovieEntity;

import java.util.stream.Collectors;

public class MovieMapper {

    public static MovieEntity toEntity(MovieRequestDto movieRequestDto){
        MovieEntity movieEntity=new MovieEntity();
        movieEntity.setName(movieRequestDto.getName());
        movieEntity.setDescription(movieRequestDto.getDescription());
        movieEntity.setReleaseDate(movieRequestDto.getReleaseDate());
        return movieEntity;
    }

    public static MovieResponseDto toDto(MovieEntity movieEntity){
      return MovieResponseDto.builder()
              .id(movieEntity.getId())
                .name(movieEntity.getName())
                .description(movieEntity.getDescription())
                .actors(movieEntity.getActors().stream().map(ActorMapper::toDto).collect(Collectors.toSet()))
                .languages(movieEntity.getLanguages().stream().map(LanguageMapper::toDto).collect(Collectors.toSet()))
                .releaseDate(movieEntity.getReleaseDate())
                .build();
    }



}
