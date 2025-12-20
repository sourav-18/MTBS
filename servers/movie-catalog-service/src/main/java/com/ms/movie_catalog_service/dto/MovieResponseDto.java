package com.ms.movie_catalog_service.dto;

import com.ms.movie_catalog_service.entity.ActorEntity;
import com.ms.movie_catalog_service.entity.LanguageEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MovieResponseDto {
    private Integer id;

    private String name;

    private String description;

    private Set<String> languages;

    private Set<ActorResponseDto> actors;

    private Set<String> imageUrls;

    private LocalDate releaseDate;
}
