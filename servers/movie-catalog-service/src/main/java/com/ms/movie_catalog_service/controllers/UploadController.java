package com.ms.movie_catalog_service.controllers;

import com.ms.movie_catalog_service.service.UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Set;


@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/uploads")
public class UploadController {

    private final UploadService uploadService;

    @PostMapping("/image")
    public Map<String,Object>  uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("folderName")String folderName) {
       return uploadService.upload(file,folderName);
    }

    @PostMapping("/images")
    public Map<String,Object>  uploadFileMultipleFile(@RequestParam("files") Set<MultipartFile> files, @RequestParam("folderName")String folderName) {
        return uploadService.upload(files,folderName);
    }

}
