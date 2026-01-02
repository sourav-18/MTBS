package com.ms.movie_catalog_service.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.ms.movie_catalog_service.entity.ActorEntity;
import com.ms.movie_catalog_service.entity.LanguageEntity;
import com.ms.movie_catalog_service.entity.type.MovieStatusType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.Collection;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Set;
import java.util.stream.Collectors;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonPropertyOrder({
        "id",
        "name",
        "description",
        "languages",
        "imageUrls",
        "cardImageUrls",
        "posterImageUrls",
        "releaseDate",

})
public class MovieResponseDto {

    private Integer id;

    private String name;

    private String description;

    private MovieStatusType status;

    private Set<String> languages;

    private Set<String> cardImageUrls;

    private Set<String> posterImageUrls;

    private LocalDate releaseDate;

    private String trailerUrl;

    private String duration;

}
