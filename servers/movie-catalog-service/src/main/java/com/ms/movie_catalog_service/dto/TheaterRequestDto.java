package com.ms.movie_catalog_service.dto;

import com.ms.movie_catalog_service.entity.type.CitiesType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TheaterRequestDto {

    @NotBlank(message = "name can't be blank")
    @NotNull(message = "name is required")
    private String name;

    @NotNull(message = "city is required")
    private CitiesType city;

    @NotBlank(message = "profilePicture can't be blank")
    @NotNull(message = "profilePicture is required")
    private String profilePicture;
}
