package com.ms.auth_service.dtos;

import com.ms.auth_service.entity.types.CitiesType;
import com.ms.auth_service.entity.types.VerificationStatusType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TheaterResponseDto {

    private String name;

    private String email;

    private String password;

    private String confirmPassword;

    private CitiesType city;

    private String profilePicture;

    private VerificationStatusType verificationStatus;
}
