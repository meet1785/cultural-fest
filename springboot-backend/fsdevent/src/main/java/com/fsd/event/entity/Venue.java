package com.fsd.event.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
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
    
    @Column(nullable = false)
    private String name;
    
    private String location;
    
    private Integer capacity;
    
    @OneToMany(mappedBy = "venue")
    private List<Activity> activities = new ArrayList<>();
}