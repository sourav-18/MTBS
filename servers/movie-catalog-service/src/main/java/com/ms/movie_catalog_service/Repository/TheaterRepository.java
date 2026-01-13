package com.ms.movie_catalog_service.Repository;

import com.ms.movie_catalog_service.dto.ActorListResponseDto;
import com.ms.movie_catalog_service.dto.CommonStatusCountDetailsDto;
import com.ms.movie_catalog_service.dto.TheaterForAdminResponse;
import com.ms.movie_catalog_service.entity.TheaterEntity;
import com.ms.movie_catalog_service.entity.type.ActorStatusType;
import com.ms.movie_catalog_service.entity.type.CitiesType;
import com.ms.movie_catalog_service.entity.type.TheaterStatusType;
import com.ms.movie_catalog_service.entity.type.VerificationStatusType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TheaterRepository extends JpaRepository<TheaterEntity,Integer> {

    @Query("SELECT new com.ms.movie_catalog_service.dto.TheaterForAdminResponse(" +
            "id,name,email,profilePicture,city,status,verificationStatus)" +
            " FROM theaters WHERE " +
            "(:search IS NULL OR name LIKE %:search% ) AND " +
            "(:status IS NULL OR status=:status) AND " +
            "(:city IS NULL OR city=:city) AND " +
            "(:verificationStatus IS NULL OR verificationStatus=:verificationStatus)")
    Page<TheaterForAdminResponse> listForAdmin(@Param("search") String search,
                                              @Param("status") TheaterStatusType status,
                                              @Param("city") CitiesType city,
                                              @Param("verificationStatus") VerificationStatusType verificationStatus,
                                              Pageable pageable);


    @Query("SELECT new com.ms.movie_catalog_service.dto.CommonStatusCountDetailsDto(" +
            "CAST(verificationStatus AS String) AS verificationStatus ," +
            "CAST(COUNT(verificationStatus) AS Integer) AS ct  )" +
            " FROM theaters WHERE " +
            "(:search IS NULL OR name LIKE %:search% ) AND " +
            "(:status IS NULL OR status=:status) AND " +
            "(:city IS NULL OR city=:city) AND " +
            "(:verificationStatus IS NULL OR verificationStatus=:verificationStatus)"+
            "GROUP BY verificationStatus")
    List<CommonStatusCountDetailsDto> getVerificationStatusCountDetails(@Param("search") String search,
                                                                        @Param("status") TheaterStatusType status,
                                                                        @Param("city") CitiesType city,
                                                                        @Param("verificationStatus") VerificationStatusType verificationStatus);

    @Query("SELECT new com.ms.movie_catalog_service.dto.CommonStatusCountDetailsDto(" +
            "CAST(status AS String) AS status ," +
            "CAST(COUNT(status) AS Integer) AS ct  )" +
            " FROM theaters WHERE " +
            "(:search IS NULL OR name LIKE %:search% ) AND " +
            "(:status IS NULL OR status=:status) AND " +
            "(:city IS NULL OR city=:city) AND " +
            "(:verificationStatus IS NULL OR verificationStatus=:verificationStatus)"+
            "GROUP BY status")
    List<CommonStatusCountDetailsDto> getStatusCountDetails(@Param("search") String search,
                                                            @Param("status") TheaterStatusType status,
                                                            @Param("city") CitiesType city,
                                                            @Param("verificationStatus") VerificationStatusType verificationStatus);

}
