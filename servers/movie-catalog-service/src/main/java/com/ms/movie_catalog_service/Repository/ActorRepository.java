package com.ms.movie_catalog_service.Repository;

import com.ms.movie_catalog_service.dto.ActorListResponseDto;
import com.ms.movie_catalog_service.dto.ActorResponseDto;
import com.ms.movie_catalog_service.entity.ActorEntity;
import com.ms.movie_catalog_service.entity.LanguageEntity;
import com.ms.movie_catalog_service.entity.MovieEntity;
import com.ms.movie_catalog_service.entity.type.ActorStatusType;
import com.ms.movie_catalog_service.entity.type.GenderType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface ActorRepository extends JpaRepository<ActorEntity,Integer> {

    public Set<ActorEntity> findByIdIn(Set<Integer> actorIds);

    @Query("select a.id, a.name,a.gender,a.profilePicture,a.dob,a.nationality,a.rating,a.status, " +
            "count(a.id) as movie_count from actors as a LEFT JOIN movie_actors as ma on a=ma.actor" +
            " WHERE a.status=:status AND (:name IS NULL OR a.name LIKE %:name%) group by a.id")
    Page<ActorListResponseDto>findAllActors(@Param("status") ActorStatusType status, @Param("name") String name, Pageable pageable);

    @Modifying
    @Query("UPDATE actors SET name=:name,gender=:gender,profilePicture=:profilePicture WHERE id=:id")
    Integer updateById(@Param("name") String name, @Param("gender") GenderType gender, @Param("profilePicture") String profilePicture, @Param("id") Integer id);

    @Query("SELECT gender,COUNT(gender) FROM actors WHERE status=:status GROUP BY gender")
    List<Object[]> countDetails(@Param("status") ActorStatusType statusType);


}
