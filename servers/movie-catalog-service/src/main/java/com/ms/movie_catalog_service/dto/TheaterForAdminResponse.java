package com.ms.movie_catalog_service.dto;

import com.ms.movie_catalog_service.entity.type.CitiesType;
import com.ms.movie_catalog_service.entity.type.TheaterStatusType;
import com.ms.movie_catalog_service.entity.type.VerificationStatusType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class TheaterForAdminResponse {
    private Integer id;

    private String name;

    private String email;

    private CitiesType city;

    private String profilePicture;

    private VerificationStatusType verificationStatus;

    private  TheaterStatusType status;

    public TheaterForAdminResponse
            (Integer id,
             String name,
             String email,
             String profilePicture,
             CitiesType city,
             TheaterStatusType status,
             VerificationStatusType verificationStatus
             ) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.verificationStatus = verificationStatus;
        this.profilePicture = profilePicture;
        this.city = city;
        this.email = email;
    }
}
