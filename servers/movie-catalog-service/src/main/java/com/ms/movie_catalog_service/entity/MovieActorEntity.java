package com.ms.movie_catalog_service.entity;

import com.ms.movie_catalog_service.entity.type.MovieActorStatusType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "movie_actors")
@Getter
@Setter
public class MovieActor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    private MovieEntity movieId;

    @OneToOne
    private ActorEntity actorId;

    @Enumerated(EnumType.STRING)
    private MovieActorStatusType status=MovieActorStatusType.Active;
}
