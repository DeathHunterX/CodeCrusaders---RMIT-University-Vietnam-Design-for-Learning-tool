package com.example.server.api.response;

import com.example.server.model.enums.GroupingType;
import com.example.server.model.enums.SessionOption;
import com.example.server.model.enums.SessionName;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SessionDetailsResponse {
    @Enumerated(EnumType.STRING)
    private SessionName sessionName;

    @Enumerated(EnumType.STRING)
    private GroupingType groupingType;

    @Enumerated(EnumType.STRING)
    private SessionOption sessionOption;

    private Boolean hasLecturer;
}
