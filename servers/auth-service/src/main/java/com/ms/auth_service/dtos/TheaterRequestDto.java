package com.ms.auth_service.dtos;

import com.ms.auth_service.entity.types.CitiesType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
public class TheaterRequestDto {

    @NotBlank(message = "name can't be blank")
    @NotNull(message = "name is required")
    private String name;

    @NotNull(message = "email is required")
    @Email(message = "email should be valid")
    private String email;

    @NotBlank(message = "password can't be blank")
    @NotNull(message = "password is required")
    private String password;

    @NotBlank(message = "confirmPassword can't be blank")
    @NotNull(message = "confirmPassword is required")
    private String confirmPassword;

    @NotBlank(message = "city can't be blank")
    @NotNull(message = "city is required")
    private CitiesType city;

    @NotBlank(message = "profilePicture can't be blank")
    @NotNull(message = "profilePicture is required")
    private String profilePicture;
}
