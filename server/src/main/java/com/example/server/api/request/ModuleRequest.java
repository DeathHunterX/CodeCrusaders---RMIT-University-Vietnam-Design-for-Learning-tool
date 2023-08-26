package com.example.server.api.request;

import com.example.server.model.Session;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class ModuleRequest {
    private String name;
    private String los;
    private List<SessionRequest> sessionList;
}
