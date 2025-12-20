package com.ms.movie_catalog_service.entity;

import com.ms.movie_catalog_service.entity.type.ImageType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "movie_images")
@Getter
@Setter
public class MovieImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private MovieEntity movie;

    @Enumerated(EnumType.STRING)
    private ImageType imageType;

}
