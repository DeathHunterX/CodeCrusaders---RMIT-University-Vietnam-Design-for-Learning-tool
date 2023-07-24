package com.example.server.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

@ResponseStatus(HttpStatus.NOT_FOUND)
@Getter
@Setter
public class ObjectNotFoundException extends RuntimeException{
    private String resourceName;
    private String fieldName;
    private Map<String, Object> errorMap;
    private int statusCode;

    public ObjectNotFoundException(String resourceName, String fieldName) {
        super(String.format("%s not found with this %s", resourceName, fieldName));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.errorMap = generateErrorMap();
    }

    public ObjectNotFoundException(String resourceName, String fieldName, int statusCode) {
        super(String.format("%s not found with this %s", resourceName, fieldName));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.statusCode = statusCode;
        this.errorMap = generateErrorMap();
    }

    private Map<String, Object> generateErrorMap() {
        Map<String, Object> errorMap = new HashMap<>();
        errorMap.put("message", getMessage());
        return errorMap;
    }

    public Map<String, Object> toResponse() {
        return errorMap;
    }

    public int getStatusCode() {
        return statusCode;
    }
}

