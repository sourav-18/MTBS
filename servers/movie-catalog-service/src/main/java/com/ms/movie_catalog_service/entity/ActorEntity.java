package com.ms.movie_catalog_service.entity;

import com.ms.movie_catalog_service.entity.type.ActorStatusType;
import com.ms.movie_catalog_service.entity.type.GenderType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "actors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private ActorStatusType status=ActorStatusType.Active;

    private String profilePicture;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private GenderType gender;

    @Column(nullable = false)
    private LocalDate dob;

    @Column(nullable = false)
    private String nationality;

    @Column(nullable = false)
    private Integer rating;

    @Column(nullable = false)
    private Integer createdBy;

    private Integer updatedBy;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;



}
