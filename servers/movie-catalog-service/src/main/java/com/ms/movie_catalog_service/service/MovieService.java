package com.ms.movie_catalog_service.service;

import com.ms.movie_catalog_service.Repository.ActorRepository;
import com.ms.movie_catalog_service.Repository.LanguageRepository;
import com.ms.movie_catalog_service.Repository.MovieRepository;
import com.ms.movie_catalog_service.dto.MovieRequestDto;
import com.ms.movie_catalog_service.entity.ActorEntity;
import com.ms.movie_catalog_service.entity.LanguageEntity;
import com.ms.movie_catalog_service.entity.MovieEntity;
import com.ms.movie_catalog_service.mapper.MovieMapper;
import com.ms.movie_catalog_service.utils.ResponseUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class MovieService {

    private final MovieRepository movieRepository;
    private final LanguageRepository languageRepository;
    private final ActorRepository actorRepository;

    public Map<String,Object> create(MovieRequestDto movieRequestDto, Integer userId){
        Set<ActorEntity> actorEntities=actorRepository.findByIdIn(movieRequestDto.getActors());
        Set<LanguageEntity> languageEntities =languageRepository.findByIdIn(movieRequestDto.getLanguages());
        MovieEntity movieEntity=MovieMapper.toEntity(movieRequestDto);
        movieEntity.setActors(actorEntities);
        movieEntity.setLanguages(languageEntities);
        movieEntity.setCreatedBy(userId);
        MovieEntity dbRes=movieRepository.save(movieEntity);
        return ResponseUtils.sendSuccess("movie create successfully",MovieMapper.toDto(dbRes));
    }

}
