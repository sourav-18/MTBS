package com.ms.auth_service.services;

import com.ms.auth_service.Repository.OtpRepository;
import com.ms.auth_service.dtos.OtpRequestDto;
import com.ms.auth_service.dtos.OtpVerifyRequestDto;
import com.ms.auth_service.entity.OtpEntity;
import com.ms.auth_service.entity.types.OtpMediumType;
import com.ms.auth_service.utils.OtpTemplateUtils;
import com.ms.auth_service.utils.ResponseUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.sql.Date;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class OtpService {
    private final OtpRepository otpRepository;
    private final EmailService emailService;

    @Value("${server.environment}")
    private String serverEnvironment;

    public Integer send(String mediumId, OtpMediumType medium) {
        SecureRandom random = new SecureRandom();
        Integer otp = 100000 + random.nextInt(900000);
        boolean isOtpSent = false;

        if(serverEnvironment.equals("dev")){
            otp=123456;
            isOtpSent=true;
        }else {
            switch (medium) {
                case Email ->
                        isOtpSent = emailService.sendEmail(mediumId, OtpTemplateUtils.getEmailSubject(), OtpTemplateUtils.getEmailBody(otp.toString()));
            }
        }

        if (!isOtpSent) return null;

        OtpEntity otpEntity = new OtpEntity();
        otpEntity.setMedium(medium);
        otpEntity.setMediumId(mediumId);
        otpEntity.setOtp(otp);
        OtpEntity otpDbRes = otpRepository.save(otpEntity);
        return otpDbRes.getId();
    }

    public Map<String, Object> sendOtp(OtpRequestDto otpRequestDto) {
        if (otpRequestDto.getMedium() == OtpMediumType.Email &&
                (!otpRequestDto.getMediumId().matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$"))) {
            return ResponseUtils.sendError("Email should be valid", null);
        }
        Integer otpId = this.send(otpRequestDto.getMediumId(), otpRequestDto.getMedium());
        if (otpId == null) {
            return ResponseUtils.sendError("Failed to send otp", null);
        }

        return ResponseUtils.sendSuccess("Otp send successfully", otpId);
    }

    public Map<String, Object> verifyOtp(OtpVerifyRequestDto otpVerifyRequestDto) {
//        if(!verify(otpVerifyRequestDto.getOtpId(),otpVerifyRequestDto.getOtp())){
//            return ResponseUtils.sendError("Invalid otp",null);
//        }
        return ResponseUtils.sendSuccess("Otp verify successfully", null);
    }

    public boolean verify(Integer otpId, Integer otp, String mediumId) {
        OtpEntity otpEntity = otpRepository.findById(otpId).orElse(null);
        if (otpEntity == null) return false;
        if(otpEntity.getIsUse())return false;
        if (!Objects.equals(otpEntity.getOtp(), otp)) return false;
        if (!otpEntity.getMediumId().equals(mediumId)) return false;

        LocalDateTime createdAt = otpEntity.getCreatedAt();
        LocalDateTime now = LocalDateTime.now();
        Duration duration = Duration.between(createdAt, now);
        if (duration.toMinutes() > 5) return false;
        otpEntity.setIsUse(true);
        otpRepository.save(otpEntity);

        return true;
    }
}
