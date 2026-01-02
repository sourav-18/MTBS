package com.ms.auth_service.Repository;

import com.ms.auth_service.entity.TheaterEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TheaterRepository extends JpaRepository<TheaterEntity,Integer> {
}
