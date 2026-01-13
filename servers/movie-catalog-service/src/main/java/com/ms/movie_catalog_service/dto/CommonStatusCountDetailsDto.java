package com.ms.movie_catalog_service.dto;

import com.ms.movie_catalog_service.entity.type.VerificationStatusType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class CommonStatusCountDetailsDto {
    private String status;
    private Integer count;

    public CommonStatusCountDetailsDto(String status,Integer count) {
        this.status = status;
        this.count = count;
    }
}
