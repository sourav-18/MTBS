package com.ms.movie_catalog_service.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ms.movie_catalog_service.entity.type.MovieStatusType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnTransformer;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import tools.jackson.databind.JsonNode;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity(name = "movies")
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class MovieEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false,columnDefinition = "TEXT")
    private String description;

    private Set<String> imageUrls;

    @ManyToMany
    @JoinTable(
            name = "movie_languages",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "language_id")
    )
    private Set<LanguageEntity> languages;

    @Enumerated(EnumType.STRING)
    private MovieStatusType status=MovieStatusType.Active;


    @Column(nullable = false)
    private LocalDate releaseDate;

    @Column(nullable = false)
    private Integer createdBy;

    private Integer updatedBy;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column(columnDefinition = "jsonb")
    @ColumnTransformer(write = "?::json")
    private String cardImagesUrls;

    @Column(columnDefinition = "jsonb")
    @ColumnTransformer(write = "?::json")
    private String posterImageUrls;

}
