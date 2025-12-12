package com.ms.movie_catalog_service.Repository;

import com.ms.movie_catalog_service.dto.ActorResponseDto;
import com.ms.movie_catalog_service.entity.ActorEntity;
import com.ms.movie_catalog_service.entity.type.ActorStatusType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ActorRepository extends JpaRepository<ActorEntity,Integer> {

    @Query("SELECT id,name,gender,profilePicture FROM actors WHERE status=:status AND (:name IS NULL OR name LIKE %:name%)")
    Page<ActorResponseDto>findAllActors(@Param("status") ActorStatusType status, @Param("name") String name,Pageable pageable);

}
