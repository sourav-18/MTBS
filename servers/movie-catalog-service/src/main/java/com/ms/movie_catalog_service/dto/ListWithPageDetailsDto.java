package com.ms.movie_catalog_service.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class ListWithPageDetailsDto<T> {
    private final List<T>  contains;
    private final Integer totalPages;
    private final Long totalCount;
}
