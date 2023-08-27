package com.example.server.model;

import com.example.server.model.activities.*;
import com.example.server.model.enums.ActivityID;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "jsonActivityType")
@JsonSubTypes({
    @JsonSubTypes.Type(value = WarmUp.class, name = "warm_up"),
    @JsonSubTypes.Type(value = ReadWatchListen.class, name = "read_watch_listen"),
    @JsonSubTypes.Type(value = Discuss.class, name = "discuss"),
    @JsonSubTypes.Type(value = Reflect.class, name = "reflect"),
    @JsonSubTypes.Type(value = Break.class, name = "break"),
    @JsonSubTypes.Type(value = Collaborate.class, name = "collaborate"),
})
public abstract class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Enumerated(EnumType.STRING)
    private ActivityID activityID;

    private Integer duration;

    private String activityName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "session_id")
    @JsonIgnore
    private Session session;

}


