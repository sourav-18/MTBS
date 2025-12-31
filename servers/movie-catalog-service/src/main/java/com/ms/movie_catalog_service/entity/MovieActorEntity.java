package com.ms.movie_catalog_service.entity;

import com.ms.movie_catalog_service.entity.type.MovieActorStatusType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity(name = "movie_actors")
@Getter
@Setter
public class MovieActorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private MovieEntity movie;

    @ManyToOne
    @JoinColumn(name = "actor_id")
    private ActorEntity actor;

    @Enumerated(EnumType.STRING)
    private MovieActorStatusType status=MovieActorStatusType.Active;
}
