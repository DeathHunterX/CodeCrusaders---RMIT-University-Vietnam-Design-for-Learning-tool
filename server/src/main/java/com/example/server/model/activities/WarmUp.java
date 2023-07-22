package com.example.server.model.activities;

import com.example.server.model.Activity;
import jakarta.persistence.Entity;
import jdk.jfr.DataAmount;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
public class WarmUp extends Activity {
    private String warmUpOption;
    private String doNowOption;


}
