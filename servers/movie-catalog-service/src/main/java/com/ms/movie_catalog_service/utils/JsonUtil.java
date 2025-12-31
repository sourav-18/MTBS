package com.ms.movie_catalog_service.utils;


import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.type.TypeFactory;

import java.util.List;
import java.util.Set;

public class JsonUtil {

    public static String objectToJsonString(Object object){
        ObjectMapper objectMapper=new ObjectMapper();
        return  objectMapper.writeValueAsString(object);
    }

    public static <T> T jsonStringToObject(String jsonString, Class<T> clazz){
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(jsonString, clazz);
    }
}
