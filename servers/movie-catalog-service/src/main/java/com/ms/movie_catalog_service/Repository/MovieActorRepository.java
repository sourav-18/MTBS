package com.ms.movie_catalog_service.Repository;

import com.ms.movie_catalog_service.entity.ActorEntity;
import com.ms.movie_catalog_service.entity.MovieActorEntity;
import com.ms.movie_catalog_service.entity.MovieEntity;
import com.ms.movie_catalog_service.entity.type.ActorStatusType;
import com.ms.movie_catalog_service.entity.type.MovieActorStatusType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface MovieActorRepository extends JpaRepository<MovieActorEntity,Integer> {

    List<MovieActorEntity> findByMovie(MovieEntity movieEntity);
    List<MovieActorEntity> findByActorIn(Set<ActorEntity>actors);
    Set<MovieActorEntity> findByActorInAndStatusAndMovie(Set<ActorEntity>actors,MovieActorStatusType movieActorStatusType,MovieEntity movie);

    @Modifying
    @Query("UPDATE movie_actors SET status=:status WHERE actor IN :actors AND movie=:movie")
    Integer updateStatusByActors(@Param("status") MovieActorStatusType status,@Param("movie") MovieEntity movie,@Param("actors") Set<ActorEntity> actors);

    @Modifying
    @Query("UPDATE movie_actors SET status=:status WHERE id IN :ids")
    Integer updateStatusByIds(@Param("status") MovieActorStatusType status,@Param("ids") Set<Integer> ids);



}
