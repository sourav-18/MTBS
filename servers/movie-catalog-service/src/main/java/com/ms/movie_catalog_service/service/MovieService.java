package com.ms.movie_catalog_service.service;

import com.ms.movie_catalog_service.Repository.ActorRepository;
import com.ms.movie_catalog_service.Repository.LanguageRepository;
import com.ms.movie_catalog_service.Repository.MovieImageRepository;
import com.ms.movie_catalog_service.Repository.MovieRepository;
import com.ms.movie_catalog_service.dto.ListWithPageDetailsDto;
import com.ms.movie_catalog_service.dto.MovieListQueryDto;
import com.ms.movie_catalog_service.dto.MovieRequestDto;
import com.ms.movie_catalog_service.dto.MovieResponseDto;
import com.ms.movie_catalog_service.entity.ActorEntity;
import com.ms.movie_catalog_service.entity.LanguageEntity;
import com.ms.movie_catalog_service.entity.MovieEntity;
import com.ms.movie_catalog_service.entity.MovieImageEntity;
import com.ms.movie_catalog_service.entity.type.ImageType;
import com.ms.movie_catalog_service.entity.type.MovieStatusType;
import com.ms.movie_catalog_service.mapper.MovieMapper;
import com.ms.movie_catalog_service.utils.JsonUtil;
import com.ms.movie_catalog_service.utils.ResponseUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MovieService {

    private final MovieRepository movieRepository;
    private final LanguageRepository languageRepository;
    private final ActorRepository actorRepository;
    private final MovieImageService movieImageService;
    private final MovieActorService movieActorService;



    public Map<String,Object> create(MovieRequestDto movieRequestDto, Integer userId){
        Set<ActorEntity> actorEntities=actorRepository.findByIdIn(movieRequestDto.getActors());
        if(actorEntities.size()!=movieRequestDto.getActors().size()){
            return ResponseUtils.sendSuccess("Actors not found",null);
        }

        Set<LanguageEntity> languageEntities =languageRepository.findByIdIn(movieRequestDto.getLanguages());
        if(languageEntities.size()!=movieRequestDto.getLanguages().size()){
            return ResponseUtils.sendSuccess("languages not found",null);
        }

        MovieEntity movieEntity=MovieMapper.toEntity(movieRequestDto);
        movieEntity.setLanguages(languageEntities);
        movieEntity.setCreatedBy(userId);
        MovieEntity dbRes=movieRepository.save(movieEntity);

        movieActorService.createAll(actorEntities,movieEntity);

        return ResponseUtils.sendSuccess("movie create successfully",MovieMapper.toDto(dbRes));
    }

    public  Map<String,Object> list(MovieListQueryDto movieListQueryDto){
        Pageable pageable= PageRequest.of(movieListQueryDto.getPage()-1,movieListQueryDto.getLimit());
        Page<MovieEntity> movies =movieRepository.findAllMovies(MovieStatusType.Active,movieListQueryDto.getName(),pageable);
        ListWithPageDetailsDto <MovieResponseDto> listWithPageDetailsDto =new ListWithPageDetailsDto<>
                (MovieMapper.toListDto(movies.getContent()),movies.getTotalPages(),movies.getTotalElements());
        return ResponseUtils.sendSuccess("movies fetch successfully",listWithPageDetailsDto);
    }

    public Map<String,Object> details(Integer movieId ){
        MovieEntity detailsDbRes=movieRepository.findById(movieId).orElse(null);
        if(detailsDbRes==null)return ResponseUtils.sendError("movie not found",null);
        return ResponseUtils.sendSuccess("Movie Details fetch successfully",MovieMapper.toDto(detailsDbRes));
    }

    @Transactional
    public Map<String,Object>update(Integer movieId,Integer userId,MovieRequestDto movieRequestDto){
        MovieEntity movieEntity=movieRepository.findById(movieId).orElse(null);
        if(movieEntity==null)return ResponseUtils.sendError("movie not found",null);
        movieEntity.setName(movieRequestDto.getName());
        movieEntity.setDescription(movieRequestDto.getDescription());
        movieEntity.setReleaseDate(movieRequestDto.getReleaseDate());
        movieEntity.setUpdatedBy(userId);
        movieEntity.setCardImagesUrls(JsonUtil.objectToJsonString(movieRequestDto.getCardImageUrls()));
        movieEntity.setPosterImageUrls(JsonUtil.objectToJsonString(movieRequestDto.getPosterImageUrls()));
        movieRepository.save(movieEntity);
        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        return ResponseUtils.sendSuccess("Movie update successfully",MovieMapper.toDto(movieEntity));
    }





}
