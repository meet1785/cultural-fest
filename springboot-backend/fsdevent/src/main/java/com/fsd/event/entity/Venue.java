package com.fsd.event.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "venue")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"activities"})
@EqualsAndHashCode(exclude = {"activities"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "venueId")
public class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "venue_id")
    private Long venueId;
    
    @NotBlank(message = "Venue name is required")
    @Size(min = 3, max = 100, message = "Venue name must be between 3 and 100 characters")
    @Column(nullable = false)
    private String name;
    
    @NotBlank(message = "Location is required")
    @Size(max = 200, message = "Location must not exceed 200 characters")
    private String location;
    
    @Positive(message = "Capacity must be a positive number")
    private Integer capacity;
    
    @OneToMany(mappedBy = "venue")
    private List<Activity> activities = new ArrayList<>();
}