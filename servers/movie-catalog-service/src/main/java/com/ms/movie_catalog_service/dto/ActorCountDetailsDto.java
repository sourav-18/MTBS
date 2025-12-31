package com.ms.movie_catalog_service.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ActorCountDetailsDto {
    private Long maleCount=0L;
    private Long femaleCount=0L;
    private Long totalCount=0L;
}
