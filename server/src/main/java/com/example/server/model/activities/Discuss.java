package com.example.server.model.activities;

import com.example.server.model.Activity;
import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@Data
public class Discuss extends Activity {
    private String groupType;
}
