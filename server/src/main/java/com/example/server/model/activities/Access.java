package com.example.server.model.activities;

import com.example.server.model.Activity;
import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@Data
public class Access extends Activity {
    private String accessType;
}
