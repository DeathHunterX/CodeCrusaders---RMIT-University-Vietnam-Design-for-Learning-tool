package com.example.server.api.response;

import com.example.server.model.Session;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ModuleDetailsResponse {
    private String name;
    private String los;
    private List<SessionDetailsResponse> sessionDetailsResponses;

}
