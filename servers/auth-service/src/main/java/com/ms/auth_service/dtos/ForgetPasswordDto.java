package com.ms.auth_service.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ForgetPasswordDto {

    @NotNull(message = "otpId is required")
    private Integer otpId;

    @NotNull(message = "otp is required")
    private Integer otp;

    @NotBlank(message = "email can't be blank")
    @NotNull(message = "email is required")
    private String email;

    @NotBlank(message = "password can't be blank")
    @NotNull(message = "password is required")
    private String password;

    @NotBlank(message = "confirmPassword can't be blank")
    @NotNull(message = "confirmPassword is required")
    private String confirmPassword;
}
