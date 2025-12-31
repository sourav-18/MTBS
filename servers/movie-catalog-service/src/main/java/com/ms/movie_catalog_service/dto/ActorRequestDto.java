package com.ms.movie_catalog_service.dto;

import com.ms.movie_catalog_service.entity.type.GenderType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.URL;

import java.time.LocalDate;

@Getter
@Setter
public class ActorRequestDto {

    @NotBlank(message = "name is required")
    @Size(max = 100,message = "name cannot exceed 100 characters")
    private String name;

    @NotNull(message = "gender is required")
    private GenderType gender;

    @Size(max = 100,message = "profilePicture cannot exceed 100 characters")
    @URL(message = "profilePicture must be valid url")
    private String profilePicture;

    @NotNull(message = "dob is required")
    private LocalDate dob;


    @NotBlank(message = "nationality is required")
    private String nationality;

    @Min(value = 1,message = "rating should be minimum 1")
    @Max(value = 5,message = "rating should be maximum 5")
    @NotNull(message = "rating is required")
    private Integer rating;


}
