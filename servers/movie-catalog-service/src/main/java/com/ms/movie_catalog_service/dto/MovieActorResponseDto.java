package com.ms.movie_catalog_service.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.ms.movie_catalog_service.entity.type.GenderType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonPropertyOrder({
        "movieId",
        "actorId",
        "actorName",
        "actorGender",
        "actorProfilePicture",

})
public class MovieActorResponseDto {
    private Integer movieId;
    private Integer actorId;
    private String actorName;
    private GenderType actorGender;
    private String actorProfilePicture;
}
