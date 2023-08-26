package com.example.server.model.activities;

import com.example.server.model.Activity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jdk.jfr.DataAmount;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Table(name = "warm_up")
public class WarmUp extends Activity {
    private String warmUpOption;
    private String engagementOption;
}
