package com.ms.auth_service.entity;

import com.ms.auth_service.entity.types.CitiesType;
import com.ms.auth_service.entity.types.TheaterStatusType;
import com.ms.auth_service.entity.types.VerificationStatusType;
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
    private final VerificationStatusType verificationStatus=VerificationStatusType.Pending;
    @Enumerated(EnumType.STRING)
    private final TheaterStatusType status=TheaterStatusType.Active;
}
