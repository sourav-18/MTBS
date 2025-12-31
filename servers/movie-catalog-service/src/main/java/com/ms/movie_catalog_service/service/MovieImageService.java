package com.ms.movie_catalog_service.service;

import com.ms.movie_catalog_service.Repository.MovieImageRepository;
import com.ms.movie_catalog_service.entity.MovieEntity;
import com.ms.movie_catalog_service.entity.MovieImageEntity;
import com.ms.movie_catalog_service.entity.type.ImageType;
import com.ms.movie_catalog_service.mapper.MovieImageMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MovieImageService {
    private final MovieImageRepository movieImageRepository;

    public void SaveAll(MovieEntity movie,Set<String> images, ImageType imageType){
        List<MovieImageEntity> movieImages=images.stream().map((imageUrl)->{
            MovieImageEntity movieImageEntity=new MovieImageEntity();
            movieImageEntity.setMovie(movie);
            movieImageEntity.setImageUrl(imageUrl);
            movieImageEntity.setImageType(imageType);
            return movieImageEntity;
        }).toList();

        movieImageRepository.saveAll(movieImages);
    }

    public List<String> getCardImageByMovieId(Set<Integer> movieIds){
        List<MovieImageEntity>cardImages= movieImageRepository.findByMovieIdInAndImageType(movieIds,ImageType.Card);
        return MovieImageMapper.toListDto(cardImages);
    }

//    public
}
