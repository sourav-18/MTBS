package com.ms.auth_service.dtos;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TheaterLoginRequestDto {

    @NotBlank(message = "email can't be blank")
    @NotNull(message = "email is required")
    private String email;

    @NotBlank(message = "password can't be blank")
    @NotNull(message = "password is required")
    private String password;
}
