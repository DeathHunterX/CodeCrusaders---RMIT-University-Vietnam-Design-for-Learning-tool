package com.example.server.api.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
public class ModuleCreateRequest {
    private String moduleName;
}
