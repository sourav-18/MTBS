package com.ms.movie_catalog_service.mapper;

import com.ms.movie_catalog_service.entity.MovieImageEntity;

import java.util.List;

public class MovieImageMapper {
    public static String toDto(MovieImageEntity movieImage){
        return movieImage.getImageUrl();
    }

    public static List<String> toListDto(List<MovieImageEntity> images){
        return images.stream().map(MovieImageMapper::toDto).toList();
    }



}
