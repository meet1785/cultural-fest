package com.fsd.event.service;

import com.fsd.event.entity.Event;
import com.fsd.event.entity.Participant;
import com.fsd.event.repository.EventRepository;
import com.fsd.event.repository.ParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final ParticipantRepository participantRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event eventDetails) {
        Event event = getEventById(id);
        event.setName(eventDetails.getName());
        event.setDescription(eventDetails.getDescription());
        event.setEventDateTime(eventDetails.getEventDateTime());  // Changed from getDate
        event.setLocation(eventDetails.getLocation());
        event.setMaxParticipants(eventDetails.getMaxParticipants());
        event.setOrganizerId(eventDetails.getOrganizerId());
        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        Event event = getEventById(id);
        eventRepository.delete(event);
    }

    @Transactional
    public Event registerParticipant(Long eventId, Long participantId) {
        Event event = getEventById(eventId);
        Participant participant = participantRepository.findById(participantId)
                .orElseThrow(() -> new RuntimeException("Participant not found with id: " + participantId));
        
        if (!event.getParticipants().contains(participant)) {
            participant.getEvents().add(event);
            participantRepository.save(participant);
        }
        
        return event;
    }
}
