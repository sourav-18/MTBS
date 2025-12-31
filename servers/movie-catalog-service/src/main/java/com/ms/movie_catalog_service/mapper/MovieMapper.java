package com.ms.movie_catalog_service.mapper;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.ms.movie_catalog_service.dto.MovieRequestDto;
import com.ms.movie_catalog_service.dto.MovieResponseDto;
import com.ms.movie_catalog_service.entity.ActorEntity;
import com.ms.movie_catalog_service.entity.MovieEntity;
import com.ms.movie_catalog_service.utils.JsonUtil;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class MovieMapper {

    public static MovieEntity toEntity(MovieRequestDto movieRequestDto){
        MovieEntity movieEntity=new MovieEntity();
        movieEntity.setName(movieRequestDto.getName());
        movieEntity.setDescription(movieRequestDto.getDescription());
        movieEntity.setReleaseDate(movieRequestDto.getReleaseDate());
        if(movieRequestDto.getCardImageUrls()!=null&&!movieRequestDto.getCardImageUrls().isEmpty()){
            movieEntity.setCardImagesUrls(JsonUtil.objectToJsonString(movieRequestDto.getCardImageUrls()));
        }
        if(movieRequestDto.getPosterImageUrls()!=null&&!movieRequestDto.getPosterImageUrls().isEmpty()){
            movieEntity.setPosterImageUrls(JsonUtil.objectToJsonString(movieRequestDto.getPosterImageUrls()));
        }
        return movieEntity;
    }

    public static MovieResponseDto toDto(MovieEntity movieEntity) {
        MovieResponseDto movieResponseDto = new MovieResponseDto();
        movieResponseDto.setId(movieEntity.getId());
        movieResponseDto.setName(movieEntity.getName());
        movieResponseDto.setDescription(movieEntity.getDescription());
        movieResponseDto.setLanguages(movieEntity.getLanguages().stream().map(LanguageMapper::toDto).collect(Collectors.toSet()));
        movieResponseDto.setReleaseDate(movieEntity.getReleaseDate());
        if (movieEntity.getCardImagesUrls() != null) {
            movieResponseDto.setCardImageUrls(JsonUtil.jsonStringToObject(movieEntity.getCardImagesUrls(), Set.class));
        }

        if (movieEntity.getPosterImageUrls() != null) {
            movieResponseDto.setPosterImageUrls(JsonUtil.jsonStringToObject(movieEntity.getPosterImageUrls(), Set.class));
        }
        return movieResponseDto;
    }

    public static List<MovieResponseDto> toListDto(List<MovieEntity>movies){
        return movies.stream().map(MovieMapper::toDto).toList();
    }



}
