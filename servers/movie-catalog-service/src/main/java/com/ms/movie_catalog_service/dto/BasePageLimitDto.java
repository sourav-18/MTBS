package com.ms.movie_catalog_service.dto;

import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BasePageLimitDto {
    @Min(value = 1,message = "page should be minimum 1")
    Integer page;

    @Min(value = 1,message = "limit should be minimum 1")
    Integer limit;
}
