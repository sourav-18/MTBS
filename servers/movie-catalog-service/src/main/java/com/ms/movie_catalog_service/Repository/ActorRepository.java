package com.ms.movie_catalog_service.Repository;

import com.ms.movie_catalog_service.dto.ActorListResponseDto;
import com.ms.movie_catalog_service.dto.ActorResponseDto;
import com.ms.movie_catalog_service.dto.ActorSelectDataDto;
import com.ms.movie_catalog_service.entity.ActorEntity;
import com.ms.movie_catalog_service.entity.LanguageEntity;
import com.ms.movie_catalog_service.entity.MovieEntity;
import com.ms.movie_catalog_service.entity.type.ActorStatusType;
import com.ms.movie_catalog_service.entity.type.GenderType;
import com.ms.movie_catalog_service.entity.type.MovieActorStatusType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface ActorRepository extends JpaRepository<ActorEntity,Integer> {

    public Set<ActorEntity> findByIdIn(Set<Integer> actorIds);

    @Query("select a.id, a.name,a.gender,a.profilePicture,a.dob,a.nationality,a.rating,a.status, " +
            "SUM(CASE WHEN ma.status=:movieActorStatus THEN 1 ELSE 0 END) as movie_count from actors as a LEFT JOIN movie_actors as ma on a=ma.actor" +
            " WHERE a.status=:status AND (:search IS NULL OR a.name LIKE %:search%) AND (:actorId IS NULL OR a.id = :actorId) group by a.id")
    Page<ActorListResponseDto>findAllActors(@Param("status") ActorStatusType status, @Param("movieActorStatus")
    MovieActorStatusType movieActorStatus, @Param("search") String search,@Param("actorId") Integer actorId, Pageable pageable);

    @Modifying
    @Query("UPDATE actors SET name=:name,gender=:gender,profilePicture=:profilePicture,dob=:dob,nationality=:nationality,rating=:rating WHERE id=:id")
    Integer updateById(@Param("name") String name, @Param("gender") GenderType gender,
                       @Param("profilePicture") String profilePicture,
                       @Param("dob") LocalDate dob,
                       @Param("nationality") String nationality,
                       @Param("rating") Integer rating,
                       @Param("id") Integer id);

    @Query("SELECT gender,COUNT(gender) FROM actors WHERE status=:status " +
            "AND (:search IS NULL OR name LIKE %:search%) " +
            "AND (:actorId IS NULL OR id = :actorId) GROUP BY gender")
    List<Object[]> countDetails(@Param("status") ActorStatusType statusType,@Param("search") String search,@Param("actorId") Integer actorId);

    @Query("SELECT new com.ms.movie_catalog_service.dto.ActorSelectDataDto (id,name,profilePicture)" +
          " FROM actors WHERE (:search IS NULL OR name LIKE %:search%) AND (:actorId IS NULL OR id = :actorId) ORDER BY id DESC LIMIT 20 ")
    List<ActorSelectDataDto> actorSelectData(@Param("search") String search,@Param("actorId") Integer actorId);


}
