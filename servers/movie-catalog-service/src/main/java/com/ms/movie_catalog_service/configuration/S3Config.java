package com.ms.movie_catalog_service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

import java.net.URI;


public class S3Config {

    @Value("${aws.s3.accessKey}")
    private String accessKey;

    @Value("${aws.s3.secretKey}")
    private String secretKey;

    @Value("${aws.s3.aws.region}")
    private String region;

    public S3Client s3Client(){
        AwsBasicCredentials awsBasicCredentials=AwsBasicCredentials.create(accessKey,secretKey);
       return S3Client.builder().
               region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(awsBasicCredentials))
               .endpointOverride(URI.create("https://h3s6.or6.idrivee2-75.com"))
               .forcePathStyle(true)
                .build();
    }
}
