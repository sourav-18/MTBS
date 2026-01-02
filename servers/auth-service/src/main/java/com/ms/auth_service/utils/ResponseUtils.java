package com.ms.movie_catalog_service.utils;

import java.util.LinkedHashMap;
import java.util.Map;

public class ResponseUtils {
    static public Map<String, Object> sendFields(String status, int statusCode, String message, Object data) {
        Map<String, Object> fields = new LinkedHashMap<>();
        fields.put("status", status);
        fields.put("statusCode", statusCode);
        fields.put("message", message);
        fields.put("data", data);
        return fields;
    }

    static public Map<String, Object> sendError(String message,Object data) {
        Map<String, Object> fields = new LinkedHashMap<>();
        return ResponseUtils.sendFields("error",500,message,data);
    }

    static public Map<String, Object> sendSuccess(String message,Object data) {
        Map<String, Object> fields = new LinkedHashMap<>();
        return ResponseUtils.sendFields("success",200,message,data);
    }
}
