package com.ms.movie_catalog_service.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TheaterCountDetailsDto {
    private Integer pendingVerificationCount=0;
    private Integer successVerificationCount=0;
    private Integer failedVerificationCount=0;
    private Integer activeStausCount=0;
    private Integer inActiveStausCount=0;
    private Integer totalCount=0;

    public void setTotalCount(){
        totalCount= activeStausCount+inActiveStausCount;
    }
}
