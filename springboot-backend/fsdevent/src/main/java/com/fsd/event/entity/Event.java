package com.fsd.event.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "event")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"activities", "participants"})
@EqualsAndHashCode(exclude = {"activities", "participants"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(length = 1000)
    private String description;
    
    private LocalDate date;
    private String location;
    private int maxParticipants;
    private Long organizerId;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<Activity> activities = new ArrayList<>();

    @ManyToMany(mappedBy = "events")
    private List<Participant> participants = new ArrayList<>();
}
