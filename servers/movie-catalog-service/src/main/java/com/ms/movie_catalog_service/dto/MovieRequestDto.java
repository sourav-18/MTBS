package com.ms.movie_catalog_service.dto;

import com.ms.movie_catalog_service.dto.validators.MovieCreateValidator;
import com.ms.movie_catalog_service.entity.ActorEntity;
import com.ms.movie_catalog_service.entity.LanguageEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.URL;

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

    @NotNull(message = "languages is required" ,groups = MovieCreateValidator.class)
    @Size(min = 1 ,message = "minimum 1 language required",groups = MovieCreateValidator.class)
    @Size(max = 20 ,message = "maximum 20 language",groups = MovieCreateValidator.class)
    private Set<Integer> languages;

    @NotNull(message = "actors is required",groups = MovieCreateValidator.class)
    private Set<Integer> actors;

    @Size(min = 1 ,message = "minimum 1 cardImageUrls required")
    @Size(max = 20 ,message = "maximum 20 cardImageUrls")
    private Set<String> cardImageUrls;

    @Size(min = 1 ,message = "minimum 1 posterImageUrls required")
    @Size(max = 20 ,message = "maximum 20 posterImageUrls")
    private Set<String> posterImageUrls;

    @NotNull(message = "releaseDate is required")
    private LocalDate releaseDate;

    @Size(max = 100,message = "profilePicture cannot exceed 100 characters")
    @URL(message = "profilePicture must be valid url")
    @NotNull(message = "profilePicture is required")
    private String trailerUrl;

    @NotBlank(message = "duration can't be empty")
    @NotNull(message = "duration is required")
    private String duration;
}
