package com.fsd.event.model;

import lombok.Data;
import java.time.LocalDate;

@Data
public class Event {
    private Long id;
    private String name;
    private String description;
    private LocalDate date;
    private String location;
    private int maxParticipants;
    private Long organizerId;
}