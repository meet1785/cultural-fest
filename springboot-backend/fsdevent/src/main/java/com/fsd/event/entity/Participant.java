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
@ToString(exclude = {"activities"})
@EqualsAndHashCode(exclude = {"activities"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "participantId")
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "participant_id")
    private Long participantId;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    private String phone;
    
    @Column(name = "college_name")
    private String collegeName;
    
    @ManyToMany(mappedBy = "participants")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "participants"})
    private List<Activity> activities = new ArrayList<>();
}
