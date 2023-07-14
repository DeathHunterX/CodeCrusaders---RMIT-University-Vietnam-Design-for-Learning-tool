package com.example.server.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
@Getter
@Setter
public class ObjectNotFoundException extends RuntimeException{
    private String resourceName;
    private String fieldName;

    public ObjectNotFoundException(String resourceName, String fieldName) {
        super(String.format("%s not found with this %s", resourceName, fieldName));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
    }
}

