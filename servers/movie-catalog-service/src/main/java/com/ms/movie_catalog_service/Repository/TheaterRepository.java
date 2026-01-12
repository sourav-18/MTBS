package com.ms.movie_catalog_service.Repository;

import com.ms.auth_service.entity.TheaterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TheaterRepository extends JpaRepository<TheaterEntity,Integer> {
    @Query("SELECT id FROM theaters WHERE email=:email LIMIT 1")
    Integer isPresent(@Param("email") String email);

    TheaterEntity findByEmail(String email);
}
