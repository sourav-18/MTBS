package com.ms.auth_service.dtos;

import com.ms.auth_service.entity.types.OtpMediumType;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OtpRequestDto {

    @NotNull(message = "mediumId is required")
    private String mediumId;

    @NotNull(message = "medium is required")
    private OtpMediumType medium;
}
