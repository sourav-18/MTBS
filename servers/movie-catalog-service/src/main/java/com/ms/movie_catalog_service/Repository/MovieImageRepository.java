package com.ms.movie_catalog_service.Repository;


import com.ms.movie_catalog_service.entity.MovieImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieImageRepository extends JpaRepository<MovieImageEntity,Integer> {

}
