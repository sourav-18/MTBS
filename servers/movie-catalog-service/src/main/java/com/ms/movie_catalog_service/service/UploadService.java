package com.ms.movie_catalog_service.service;

import com.ms.movie_catalog_service.utils.ResponseUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class UploadService {

    private final CloudinaryService cloudinaryService;

    public UploadService(CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    public Map<String,Object> upload(MultipartFile file, String folderName) {
        String imageUrl = cloudinaryService.uploadFile(file, "MTBS"+"/"+folderName);
        if(imageUrl==null) return ResponseUtils.sendSuccess("Image not uploaded",null);
        System.out.println(imageUrl);
        return ResponseUtils.sendSuccess("Image uploaded successfully",imageUrl);
    }

}
