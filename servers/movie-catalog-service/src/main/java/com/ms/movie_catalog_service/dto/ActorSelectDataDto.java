package com.ms.movie_catalog_service.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ActorSelectDataDto {
    private Integer id;
    private String name;
    private String profilePicture;

    public ActorSelectDataDto(Integer id, String name, String profilePicture) {
        this.id = id;
        this.name = name;
        this.profilePicture = profilePicture;
    }
}
