package com.fsd.event.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "activity")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"event", "participants"})
@EqualsAndHashCode(exclude = {"event", "participants"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
    
    @Column(length = 1000)
    private String description;
    
    private int duration;
    private int capacity;
    private String equipmentNeeded;
    private String location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "activities"})
    private Event event;

    @ManyToMany
    @JoinTable(
        name = "activity_participant",
        joinColumns = @JoinColumn(name = "activity_id"),
        inverseJoinColumns = @JoinColumn(name = "participant_id")
    )
    private List<Participant> participants = new ArrayList<>();
}
