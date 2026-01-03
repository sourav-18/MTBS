package com.ms.auth_service.entity;

import com.ms.auth_service.entity.types.OtpMediumType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity(name = "otps")
@Getter
@Setter
public class OtpEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer otp;

    @Column(nullable = false)
    private String mediumId;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OtpMediumType medium;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private boolean isUse=false;

    public boolean getIsUse() {
        return isUse;
    }

    public void setIsUse(boolean isUse) {
        this.isUse=isUse;
    }

}
