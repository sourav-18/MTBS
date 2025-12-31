package com.ms.movie_catalog_service.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ActorListQueryDto{
    @Min(value = 1,message = "page should be minimum 1")
    Integer page;

    @Min(value = 1,message = "limit should be minimum 1")
    Integer limit;

    @Size(min = 2, message = "name should be at least 2 character")
    @Size(max = 100, message = "name should be at max 100 character")
    String search;
}
