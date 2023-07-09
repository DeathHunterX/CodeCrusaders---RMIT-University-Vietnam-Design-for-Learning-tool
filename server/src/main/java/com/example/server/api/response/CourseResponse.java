<<<<<<< HEAD
package com.example.server.api.response;public class CourseResponse {
=======
package com.example.server.api.response;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class CourseResponse {
    private Long id;
    private String courseName;
    private String semester;
>>>>>>> 069583c1d6f8aa3fff7c7b90d600229dde4a42b0
}
