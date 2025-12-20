package com.ms.movie_catalog_service.Repository;

import com.ms.movie_catalog_service.entity.LanguageEntity;
import com.ms.movie_catalog_service.entity.MovieEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface LanguageRepository extends JpaRepository<LanguageEntity,Integer> {


    public Set<LanguageEntity> findByIdIn(Set<Integer> languageIds);

}
