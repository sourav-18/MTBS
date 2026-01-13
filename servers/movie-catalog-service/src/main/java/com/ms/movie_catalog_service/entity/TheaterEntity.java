package com.ms.movie_catalog_service.entity;

import com.ms.movie_catalog_service.entity.type.CitiesType;
import com.ms.movie_catalog_service.entity.type.TheaterStatusType;
import com.ms.movie_catalog_service.entity.type.VerificationStatusType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity(name = "theaters")
@Getter
@Setter
public class TheaterEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false,unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CitiesType city;

    @Column(nullable = false)
    private String profilePicture;

    @Enumerated(EnumType.STRING)
    private VerificationStatusType verificationStatus=VerificationStatusType.Pending;

    @Enumerated(EnumType.STRING)
    private TheaterStatusType status=TheaterStatusType.Active;
}
