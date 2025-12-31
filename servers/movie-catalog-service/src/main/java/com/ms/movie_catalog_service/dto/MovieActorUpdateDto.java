package com.ms.movie_catalog_service.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class MovieActorUpdateDto {
    public Set<Integer> actors;
}
