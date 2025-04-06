package com.fsd.event.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "event")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"activities", "manager"})
@EqualsAndHashCode(exclude = {"activities", "manager"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "eventId")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private Long eventId;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private LocalDateTime eventDateTime;
    
    @ManyToOne
    @JoinColumn(name = "manager_id")
    private EventManager manager;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<Activity> activities = new ArrayList<>();

    private String description;
    private String location;
    private Integer maxParticipants;
    private Long organizerId;

    @ManyToMany(mappedBy = "events")
    private Set<Participant> participants = new HashSet<>();
}
