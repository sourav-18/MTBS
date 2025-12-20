package com.ms.movie_catalog_service.dto;

import com.ms.movie_catalog_service.entity.ActorEntity;
import com.ms.movie_catalog_service.entity.LanguageEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MovieRequestDto {

    @NotBlank(message = "name is required")
    private String name;

    @NotBlank(message = "description is required")
    private String description;

    @NotNull(message = "languages is required")
    @Size(min = 1 ,message = "minimum 1 language required")
    @Size(max = 20 ,message = "maximum 20 language")
    private Set<Integer> languages;

    @NotNull(message = "actors is required")
    private Set<Integer> actors;

    @NotNull(message = "imageUrls is required")
    private Set<String> imageUrls;

    @NotNull(message = "releaseDate is required")
    private LocalDate releaseDate;
}
