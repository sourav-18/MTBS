package com.ms.movie_catalog_service.dto;

import com.ms.movie_catalog_service.dto.validators.BasePageLimitSearchDto;
import com.ms.movie_catalog_service.entity.type.CitiesType;
import com.ms.movie_catalog_service.entity.type.TheaterStatusType;
import com.ms.movie_catalog_service.entity.type.VerificationStatusType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TheaterListQueryDto extends BasePageLimitSearchDto {
    private TheaterStatusType status;
    private VerificationStatusType verificationStatus;
    private CitiesType city;
}
