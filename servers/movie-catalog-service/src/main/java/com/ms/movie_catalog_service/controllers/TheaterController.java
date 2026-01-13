package com.ms.movie_catalog_service.controllers;

import com.ms.movie_catalog_service.dto.TheaterListQueryDto;
import com.ms.movie_catalog_service.dto.TheaterRequestDto;
import com.ms.movie_catalog_service.entity.type.TheaterStatusType;
import com.ms.movie_catalog_service.entity.type.VerificationStatusType;
import com.ms.movie_catalog_service.service.TheaterService;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/theaters")
@RequiredArgsConstructor
@CrossOrigin
public class TheaterController {
    private final TheaterService theaterService;

    @GetMapping("list-for-admin")
    Map<String,Object>listByAdmin(@Valid @ModelAttribute TheaterListQueryDto theaterListQueryDto){
        return theaterService.listForAdmin(theaterListQueryDto);
    }

    @PatchMapping("/{id}/status/{status}")
    Map<String,Object>statusUpdate(@PathVariable("id") Integer id, @PathVariable("status")TheaterStatusType status){
        return theaterService.updateStatus(id,status);
    }

    @PatchMapping("/{id}/verificationStatus/{verificationStatus}")
    Map<String,Object>verificationStatusUpdate(@PathVariable("id") Integer id, @PathVariable("verificationStatus") VerificationStatusType verificationStatus){
        return theaterService.verificationStatusUpdate(id,verificationStatus);
    }

    @GetMapping("count-details")
    Map<String,Object>getCountDetails(@Valid @ModelAttribute TheaterListQueryDto theaterListQueryDto){
        return theaterService.getCountDetails(theaterListQueryDto);
    }

    @PutMapping("/{id}")
    Map<String,Object>update(@PathVariable("id") Integer id, @RequestBody TheaterRequestDto theaterRequestDto){
        return theaterService.update(id,theaterRequestDto);
    }

}
