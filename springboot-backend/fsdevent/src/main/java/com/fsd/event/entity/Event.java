package com.fsd.event.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
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
    
    @NotBlank(message = "Event name is required")
    @Size(min = 3, max = 100, message = "Event name must be between 3 and 100 characters")
    @Column(nullable = false)
    private String name;
    
    @NotNull(message = "Event date and time is required")
    @Future(message = "Event date and time must be in the future")
    @Column(nullable = false)
    private LocalDateTime eventDateTime;
    
    @ManyToOne
    @JoinColumn(name = "manager_id")
    private EventManager manager;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<Activity> activities = new ArrayList<>();

    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;
    
    @NotBlank(message = "Location is required")
    @Size(max = 200, message = "Location must not exceed 200 characters")
    private String location;
    
    @Positive(message = "Maximum participants must be a positive number")
    private Integer maxParticipants;
    
    private Long organizerId;

    @ManyToMany(mappedBy = "events")
    private Set<Participant> participants = new HashSet<>();
}
