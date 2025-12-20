package com.ms.movie_catalog_service.service;

import com.ms.movie_catalog_service.Repository.ActorRepository;
import com.ms.movie_catalog_service.dto.ActorListQueryDto;
import com.ms.movie_catalog_service.dto.ActorRequestDto;
import com.ms.movie_catalog_service.dto.ActorResponseDto;
import com.ms.movie_catalog_service.dto.ListWithPageDetailsDto;
import com.ms.movie_catalog_service.entity.ActorEntity;
import com.ms.movie_catalog_service.entity.type.ActorStatusType;
import com.ms.movie_catalog_service.mapper.ActorMapper;
import com.ms.movie_catalog_service.utils.ResponseUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class ActorService {
    
    private final ActorRepository actorRepository;

    public Map<String,Object> create(ActorRequestDto actorRequestDto,Integer userId){
        ActorEntity newActor= ActorMapper.toEntity(actorRequestDto);
        newActor.setCreatedBy(userId);
       ActorEntity dbRes= actorRepository.save(newActor);
       return ResponseUtils.sendSuccess("actor create successfully",dbRes.getId());
    }

    public Map<String,Object> list(ActorListQueryDto actorListQueryDto) {
        Pageable pageable= PageRequest.of(actorListQueryDto.getPage()-1,actorListQueryDto.getLimit());
        Page<ActorResponseDto> actorsList=actorRepository.findAllActors(ActorStatusType.Active,actorListQueryDto.getName(),pageable);

        if(actorsList.isEmpty())return ResponseUtils.sendError("no actors found",null);

        ListWithPageDetailsDto<ActorResponseDto> listWithPageDetailsDto=new ListWithPageDetailsDto<>
                (actorsList.getContent(),actorsList.getTotalPages(),actorsList.getTotalElements());

        return ResponseUtils.sendSuccess("actors fetch successfully",listWithPageDetailsDto);
    }

    @Transactional
    public Map<String,Object> update(Integer actorId,ActorRequestDto actorRequestDto){
        Integer updateDbRes=actorRepository.updateById(
                actorRequestDto.getName(),
                actorRequestDto.getGender(),
                actorRequestDto.getProfilePicture(),
                actorId
        );
        System.out.println(updateDbRes);
        if(updateDbRes==0){
            return ResponseUtils.sendError("actor not found",null);
        }

        ActorResponseDto actorResponseDto= new ActorResponseDto(
                actorId,
                actorRequestDto.getName(),
                actorRequestDto.getGender(),
                actorRequestDto.getProfilePicture());

        return ResponseUtils.sendSuccess("actor update successfully",actorResponseDto);
    }
}
