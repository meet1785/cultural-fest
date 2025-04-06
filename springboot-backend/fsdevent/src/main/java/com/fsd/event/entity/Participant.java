package com.fsd.event.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "participant")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"activities"})
@EqualsAndHashCode(exclude = {"activities"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "participantId")
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "participant_id")
    private Long participantId;
    
    @Column(nullable = false)
    private String firstName;
    
    @Column(nullable = false)
    private String lastName;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    private String phone;
    
    private String address;
    
    private String emergencyContact;
    
    private String dietaryRestrictions;
    
    @ManyToMany
    private Set<Event> events = new HashSet<>();
    
    @ManyToMany(mappedBy = "participants")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "participants"})
    private Set<Activity> activities = new HashSet<>();
}
