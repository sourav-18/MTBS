package com.ms.movie_catalog_service.dto;

import com.ms.movie_catalog_service.entity.type.GenderType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.URL;

@Getter
@Setter
@AllArgsConstructor
public class ActorResponseDto {
    private Integer id;
    private String name;

    private GenderType gender;

    private String profilePicture;
}
