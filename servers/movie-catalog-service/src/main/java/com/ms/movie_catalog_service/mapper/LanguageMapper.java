package com.ms.movie_catalog_service.mapper;

import com.ms.movie_catalog_service.dto.LanguageResponseDto;
import com.ms.movie_catalog_service.entity.LanguageEntity;

public class LanguageMapper {
    public static String toDto(LanguageEntity language){
        return language.getName();
    }
}
