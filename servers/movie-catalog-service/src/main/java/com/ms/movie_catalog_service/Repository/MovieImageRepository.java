package com.ms.movie_catalog_service.Repository;


import com.ms.movie_catalog_service.entity.LanguageEntity;
import com.ms.movie_catalog_service.entity.MovieImageEntity;
import com.ms.movie_catalog_service.entity.type.ImageType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface MovieImageRepository extends JpaRepository<MovieImageEntity,Integer> {

    public List<MovieImageEntity> findByMovieIdInAndImageType(Set<Integer> movieIds, ImageType imageType);

}
