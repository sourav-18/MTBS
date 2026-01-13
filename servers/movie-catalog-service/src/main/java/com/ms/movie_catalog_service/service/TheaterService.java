package com.ms.movie_catalog_service.service;

import com.ms.movie_catalog_service.Repository.TheaterRepository;
import com.ms.movie_catalog_service.dto.*;
import com.ms.movie_catalog_service.entity.TheaterEntity;
import com.ms.movie_catalog_service.entity.type.TheaterStatusType;
import com.ms.movie_catalog_service.entity.type.VerificationStatusType;
import com.ms.movie_catalog_service.mapper.MovieMapper;
import com.ms.movie_catalog_service.utils.ResponseUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TheaterService {

    private final TheaterRepository theaterRepository;

    public Map<String,Object> listForAdmin(TheaterListQueryDto theaterListQueryDto){
        Pageable pageable = PageRequest.of(
                theaterListQueryDto.getPage() != null ? theaterListQueryDto.getPage() - 1 : 0,
                theaterListQueryDto.getLimit() != null ? theaterListQueryDto.getLimit() : 10,
                Sort.by(Sort.Direction.DESC, "id")
        );

        Page<TheaterForAdminResponse> theaterList=
                theaterRepository.listForAdmin(
                                        theaterListQueryDto.getSearch(),
                                        theaterListQueryDto.getStatus(),
                                        theaterListQueryDto.getCity(),
                                        theaterListQueryDto.getVerificationStatus(),
                                        pageable
                                        );


        if(theaterList.isEmpty()) return ResponseUtils.sendError("Theater not found", null);

        ListWithPageDetailsDto<TheaterForAdminResponse> listWithPageDetailsDto = new ListWithPageDetailsDto<>
                (theaterList.getContent(), theaterList.getTotalPages(), theaterList.getTotalElements());

        return ResponseUtils.sendSuccess("Theater list fetch successfully", listWithPageDetailsDto);

    }

    @Transactional
    public Map<String,Object> verificationStatusUpdate(Integer id,VerificationStatusType verificationStatus){
        TheaterEntity theaterEntity= theaterRepository.findById(id).orElse(null);
        if(theaterEntity==null)return ResponseUtils.sendError("Theater not found",null);
        theaterEntity.setVerificationStatus(verificationStatus);
        theaterRepository.save(theaterEntity);
        //todo send mail to theate for verificationStatus update
        return ResponseUtils.sendSuccess("Theater verificationStatus update successfully",null);
    }


    @Transactional //todo it's not use for when save (but i set for get idea to this is db update function)
    public Map<String,Object> updateStatus(Integer id, TheaterStatusType status){
        TheaterEntity theaterEntity= theaterRepository.findById(id).orElse(null);
        if(theaterEntity==null)return ResponseUtils.sendError("Theater not found",null);
        theaterEntity.setStatus(status);
        theaterRepository.save(theaterEntity);
        //todo send mail to theate for status update
        return ResponseUtils.sendSuccess("Theater status update successfully",null);
    }

    public  Map<String,Object> getCountDetails(TheaterListQueryDto theaterListQueryDto){
        List<CommonStatusCountDetailsDto> verificationStatusCount=theaterRepository.getVerificationStatusCountDetails(
                theaterListQueryDto.getSearch(),
                theaterListQueryDto.getStatus(),
                theaterListQueryDto.getCity(),
                theaterListQueryDto.getVerificationStatus()
        );
        List<CommonStatusCountDetailsDto>  statusCountDetails=theaterRepository.getStatusCountDetails(
                theaterListQueryDto.getSearch(),
                theaterListQueryDto.getStatus(),
                theaterListQueryDto.getCity(),
                theaterListQueryDto.getVerificationStatus()
        );
        TheaterCountDetailsDto theaterCountDetailsDto=new TheaterCountDetailsDto();

        verificationStatusCount.forEach((item)->{
            if(Objects.equals(item.getStatus(), VerificationStatusType.Pending.name())){
                theaterCountDetailsDto.setPendingVerificationCount(item.getCount());
            }else if(Objects.equals(item.getStatus(), VerificationStatusType.Success.name())){
                theaterCountDetailsDto.setSuccessVerificationCount(item.getCount());
            }else if(Objects.equals(item.getStatus(), VerificationStatusType.Failed.name())){
                theaterCountDetailsDto.setFailedVerificationCount(item.getCount());
            }
        });

        statusCountDetails.forEach((item)->{
            if(Objects.equals(item.getStatus(), TheaterStatusType.Active.name())){
                theaterCountDetailsDto.setActiveStausCount(item.getCount());
            }else if(Objects.equals(item.getStatus(), TheaterStatusType.Inactive.name())){
                theaterCountDetailsDto.setInActiveStausCount(item.getCount());
            }
        });

        theaterCountDetailsDto.setTotalCount();

        return ResponseUtils.sendSuccess("Theater count details fetch successfully",theaterCountDetailsDto);
    }

    public Map<String,Object> update(Integer id,TheaterRequestDto theaterRequestDto){
        TheaterEntity theaterEntity= theaterRepository.findById(id).orElse(null);
        if(theaterEntity==null)return ResponseUtils.sendError("Theater not found",null);
        theaterEntity.setName(theaterRequestDto.getName());
        theaterEntity.setCity(theaterRequestDto.getCity());
        theaterEntity.setProfilePicture(theaterRequestDto.getProfilePicture());
        theaterRepository.save(theaterEntity);
        return ResponseUtils.sendSuccess("Theater update successfully",null);
    }


}
