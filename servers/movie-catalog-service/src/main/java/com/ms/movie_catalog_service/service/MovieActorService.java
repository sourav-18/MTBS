package com.ms.movie_catalog_service.service;

import com.ms.movie_catalog_service.Repository.ActorRepository;
import com.ms.movie_catalog_service.Repository.MovieActorRepository;
import com.ms.movie_catalog_service.Repository.MovieRepository;
import com.ms.movie_catalog_service.dto.MovieActorUpdateDto;
import com.ms.movie_catalog_service.entity.ActorEntity;
import com.ms.movie_catalog_service.entity.MovieActorEntity;
import com.ms.movie_catalog_service.entity.MovieEntity;
import com.ms.movie_catalog_service.entity.type.MovieActorStatusType;
import com.ms.movie_catalog_service.mapper.MovieActorMapper;
import com.ms.movie_catalog_service.utils.ResponseUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MovieActorService {
    private final MovieActorRepository movieActorRepository;
    private final MovieRepository movieRepository;
    private final ActorRepository actorRepository;


    public void createAll(Set<ActorEntity> actorEntities, MovieEntity movieEntity){
        List<MovieActorEntity> movieActors=actorEntities.stream().map((actor)->{
            MovieActorEntity movieActorEntity=new MovieActorEntity();
            movieActorEntity.setActor(actor);
            movieActorEntity.setMovie(movieEntity);
        return movieActorEntity;
        }).toList();
        movieActorRepository.saveAll(movieActors);
    }

    public void inactiveAll(Set<ActorEntity> actorEntities, MovieEntity movieEntity){
        List<MovieActorEntity> movieActors=actorEntities.stream().map((actor)->{
            MovieActorEntity movieActorEntity=new MovieActorEntity();
            movieActorEntity.setActor(actor);
            movieActorEntity.setMovie(movieEntity);
            return movieActorEntity;
        }).toList();
        movieActorRepository.saveAll(movieActors);
    }

    public void activeAll(Set<ActorEntity> actorEntities,MovieEntity movieEntity){
        movieActorRepository.updateStatusByActors(MovieActorStatusType.Active,movieEntity,actorEntities);
    }

    public Map<String, Object> getMovieActors(Integer movieId) {
        MovieEntity movieEntity=movieRepository.findById(movieId).orElse(null);
        if (movieEntity==null) {
            return ResponseUtils.sendError("movie not found", null);
        }
        List<MovieActorEntity> movieActors = movieActorRepository.findByMovie(movieEntity);
        if (movieActors.isEmpty()) {
            return ResponseUtils.sendError("no movie actor found", null);
        }
        return ResponseUtils.sendSuccess("movie actor fetch successfully", MovieActorMapper.toListDto(movieActors));
    }

    @Transactional
    public Map<String, Object> addMovieActor(Integer movieId, MovieActorUpdateDto movieActorUpdateDto) {
        MovieEntity movieEntity=movieRepository.findById(movieId).orElse(null);
        if(movieEntity==null)return ResponseUtils.sendError("movie not found",null);

        Set<ActorEntity> actorEntities=actorRepository.findByIdIn(movieActorUpdateDto.getActors());
        System.out.println(actorEntities.size());
        if(actorEntities.size()!=movieActorUpdateDto.getActors().size()){
            return ResponseUtils.sendSuccess("Actors not found",null);
        }

        Set<MovieActorEntity>movieActorEntities=movieActorRepository.findByActorInAndStatusAndMovie(actorEntities,MovieActorStatusType.Active,movieEntity);
        if(!movieActorEntities.isEmpty()){
            return ResponseUtils.sendSuccess("Actors already exist",null);
        }

        Set<MovieActorEntity>movieActorInactiveEntities=movieActorRepository.findByActorInAndStatusAndMovie(actorEntities,MovieActorStatusType.Inactive,movieEntity);
        if(!movieActorInactiveEntities.isEmpty()){
            movieActorRepository.updateStatusByIds(MovieActorStatusType.Active, movieActorInactiveEntities.stream().map(MovieActorEntity::getId).collect(Collectors.toSet()));
            actorEntities=actorEntities.stream().filter((actor)->{
                return movieActorInactiveEntities.stream().filter(movieActor -> movieActor.getActor().getId() == actor.getId()).count() <= 0;
            }).collect(Collectors.toSet());
        }

        createAll(actorEntities,movieEntity);

        return ResponseUtils.sendSuccess("Movie actors add successfully",null);

    }

    public Map<String, Object> removeMovieActor(Integer movieId, MovieActorUpdateDto movieActorUpdateDto) {
        MovieEntity movieEntity=movieRepository.findById(movieId).orElse(null);
        if(movieEntity==null)return ResponseUtils.sendError("movie not found",null);

        Set<ActorEntity> actorEntities=actorRepository.findByIdIn(movieActorUpdateDto.getActors());

        if(actorEntities.size()!=movieActorUpdateDto.getActors().size()){
            return ResponseUtils.sendSuccess("Actors not found",null);
        }

        Set<MovieActorEntity>movieActorEntities=movieActorRepository.findByActorInAndStatusAndMovie(actorEntities,MovieActorStatusType.Active,movieEntity);
        if(movieActorEntities.size()!=movieActorUpdateDto.getActors().size()){
            return ResponseUtils.sendSuccess("Actors not add in this movie",null);
        }

        movieActorRepository.updateStatusByActors(MovieActorStatusType.Inactive,movieEntity,actorEntities);

        return ResponseUtils.sendSuccess("Movie actors remove successfully",null);

    }

}
