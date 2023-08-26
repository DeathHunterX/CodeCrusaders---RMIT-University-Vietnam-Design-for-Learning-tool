package com.example.server.model.activities;

import com.example.server.model.Activity;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.Getter;

@Entity
@Data
public class Assess extends Activity {
    private String accessType;
}
