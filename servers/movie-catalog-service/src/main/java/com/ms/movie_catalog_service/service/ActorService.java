package com.ms.movie_catalog_service.service;

import com.ms.movie_catalog_service.Repository.ActorRepository;
import com.ms.movie_catalog_service.Repository.MovieRepository;
import com.ms.movie_catalog_service.dto.*;
import com.ms.movie_catalog_service.entity.ActorEntity;
import com.ms.movie_catalog_service.entity.MovieEntity;
import com.ms.movie_catalog_service.entity.type.ActorStatusType;
import com.ms.movie_catalog_service.entity.type.GenderType;
import com.ms.movie_catalog_service.mapper.ActorMapper;
import com.ms.movie_catalog_service.utils.ResponseUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ActorService {

    private final ActorRepository actorRepository;
    private final MovieRepository movieRepository;

    public Map<String, Object> create(ActorRequestDto actorRequestDto, Integer userId) {
        ActorEntity newActor = ActorMapper.toEntity(actorRequestDto);
        newActor.setCreatedBy(userId);
        ActorEntity dbRes = actorRepository.save(newActor);
        return ResponseUtils.sendSuccess("actor create successfully", dbRes.getId());
    }

    public Map<String, Object> list(ActorListQueryDto actorListQueryDto) {
        Pageable pageable = PageRequest.of(
                actorListQueryDto.getPage()!=null?actorListQueryDto.getPage() - 1:1,
                actorListQueryDto.getLimit()!=null?actorListQueryDto.getLimit():10,
                Sort.by(Sort.Direction.DESC,"id")
        );

        Page<ActorListResponseDto> actorsList = actorRepository.findAllActors(ActorStatusType.Active, actorListQueryDto.getSearch(), pageable);

        if (actorsList.isEmpty()) return ResponseUtils.sendError("no actors found", null);

        ListWithPageDetailsDto<ActorListResponseDto> listWithPageDetailsDto = new ListWithPageDetailsDto<>
                (actorsList.getContent(), actorsList.getTotalPages(), actorsList.getTotalElements());

        return ResponseUtils.sendSuccess("actors fetch successfully", listWithPageDetailsDto);
    }

    @Transactional
    public Map<String, Object> update(Integer actorId, ActorRequestDto actorRequestDto) {
        Integer updateDbRes = actorRepository.updateById(
                actorRequestDto.getName(),
                actorRequestDto.getGender(),
                actorRequestDto.getProfilePicture(),
                actorId
        );
        System.out.println(updateDbRes);
        if (updateDbRes == 0) {
            return ResponseUtils.sendError("actor not found", null);
        }

        ActorResponseDto actorResponseDto = new ActorResponseDto(
                actorId,
                actorRequestDto.getName(),
                actorRequestDto.getGender(),
                actorRequestDto.getProfilePicture(),
                actorRequestDto.getDob(),
                actorRequestDto.getNationality(),
                actorRequestDto.getRating()
        );

        return ResponseUtils.sendSuccess("actor update successfully", actorResponseDto);
    }

    public Map<String, Object> getMovieActors(Integer movieId) {
        MovieEntity movieEntity=movieRepository.findById(movieId).orElse(null);
        if (movieEntity==null) {
            return ResponseUtils.sendError("movie not found", null);
        }
//        List<ActorEntity> movieActors = actorRepository.findByMovies(movieEntity);
//        if (movieActors.isEmpty()) {
//            return ResponseUtils.sendError("no movie actor found", null);
//        }
        return ResponseUtils.sendSuccess("movie actor fetch successfully", "ActorMapper.toListDto(movieActors)");
    }

    public Map<String, Object> getTotalActorCountDetails(){
        List<Object[]> countDetails=actorRepository.countDetails(ActorStatusType.Active);

        ActorCountDetailsDto actorCountDetailsDto=new ActorCountDetailsDto();

        for (Object[] item:countDetails){
            if(item[0]== GenderType.Male){
                actorCountDetailsDto.setMaleCount((Long) item[1]);
            }
            if(item[0]== GenderType.Female){
                actorCountDetailsDto.setFemaleCount((Long) item[1]);
            }
        }

        actorCountDetailsDto.setTotalCount(actorCountDetailsDto.getMaleCount()+ actorCountDetailsDto.getFemaleCount());

        return ResponseUtils.sendSuccess("actor count details fetch successfully", actorCountDetailsDto);
        
    }

    @Transactional
    public Map<String, Object> statusUpdate(Integer actorId,ActorStatusType status){
        ActorEntity actorEntity= actorRepository.findById(actorId).orElse(null);

        if(actorEntity==null)
            return ResponseUtils.sendSuccess("actor not found", null);

        actorEntity.setStatus(status);
        actorRepository.save(actorEntity);
        return ResponseUtils.sendSuccess("actor status update successfully", null);
    }
}
