package com.ms.movie_catalog_service.dto;

import com.ms.movie_catalog_service.entity.type.ActorStatusType;
import com.ms.movie_catalog_service.entity.type.GenderType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ActorListResponseDto {
    private Integer id;
    private String name;
    private GenderType gender;
    private String profilePicture;
    private LocalDate dob;
    private String nationality;
    private Integer rating;
    private ActorStatusType status;
    private Long movieCount;
}
