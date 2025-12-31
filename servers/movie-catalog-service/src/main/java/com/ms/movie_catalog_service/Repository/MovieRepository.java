package com.ms.movie_catalog_service.Repository;

import com.ms.movie_catalog_service.dto.ActorResponseDto;
import com.ms.movie_catalog_service.dto.MovieResponseDto;
import com.ms.movie_catalog_service.entity.MovieEntity;
import com.ms.movie_catalog_service.entity.type.ActorStatusType;
import com.ms.movie_catalog_service.entity.type.MovieStatusType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<MovieEntity,Integer> {
    @Query(value = "SELECT m FROM movies m WHERE status=:status AND (:name IS NULL OR name LIKE %:name%)")
    Page<MovieEntity> findAllMovies(@Param("status") MovieStatusType status, String name, Pageable pageable);
}
