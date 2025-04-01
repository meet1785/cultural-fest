package com.fsd.event.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "participant")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"activities", "events"})
@EqualsAndHashCode(exclude = {"activities", "events"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;
    
    @Column(nullable = false)
    private String lastName;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String phone;
    
    private String address;
    private String emergencyContact;
    private String dietaryRestrictions;

    @ManyToMany(mappedBy = "participants")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "participants"})
    private List<Activity> activities = new ArrayList<>();

    @ManyToMany
    @JoinTable(
        name = "event_participant",
        joinColumns = @JoinColumn(name = "participant_id"),
        inverseJoinColumns = @JoinColumn(name = "event_id")
    )
    private List<Event> events = new ArrayList<>();
}
