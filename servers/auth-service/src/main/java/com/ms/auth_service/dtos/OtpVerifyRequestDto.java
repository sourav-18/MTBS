package com.ms.auth_service.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OtpVerifyRequestDto {

    @NotNull(message = "otpId is required")

    private Integer otpId;

    @NotNull(message = "otp is required")
    private Integer otp;

}
