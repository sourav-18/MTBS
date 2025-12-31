package com.ms.movie_catalog_service.dto;

import com.ms.movie_catalog_service.entity.type.GenderType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.validator.constraints.URL;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ActorResponseDto {
    private Integer id;
    private String name;
    private GenderType gender;
    private String profilePicture;
    private LocalDate dob;
    private String nationality;
    private Integer rating;
}
