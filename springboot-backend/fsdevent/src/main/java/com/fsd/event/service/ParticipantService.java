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
public class ParticipantService {
    private final ParticipantRepository participantRepository;
    private final EventRepository eventRepository;

    public List<Participant> getAllParticipants() {
        return participantRepository.findAll();
    }

    public Participant getParticipantById(Long id) {
        return participantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Participant not found with id: " + id));
    }

    public List<Participant> getParticipantsByEventId(Long eventId) {
        return participantRepository.findByEventsEventId(eventId);  // Changed from findByEventsId
    }

    public Participant createParticipant(Participant participant) {
        return participantRepository.save(participant);
    }

    public Participant updateParticipant(Long id, Participant participantDetails) {
        Participant participant = getParticipantById(id);
        participant.setFirstName(participantDetails.getFirstName());
        participant.setLastName(participantDetails.getLastName());
        participant.setEmail(participantDetails.getEmail());
        participant.setPhone(participantDetails.getPhone());
        participant.setAddress(participantDetails.getAddress());
        participant.setEmergencyContact(participantDetails.getEmergencyContact());
        participant.setDietaryRestrictions(participantDetails.getDietaryRestrictions());
        return participantRepository.save(participant);
    }

    public void deleteParticipant(Long id) {
        Participant participant = getParticipantById(id);
        participantRepository.delete(participant);
    }

    @Transactional
    public Participant registerForEvent(Long participantId, Long eventId) {
        Participant participant = getParticipantById(participantId);
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + eventId));

        if (!participant.getEvents().contains(event)) {
            participant.getEvents().add(event);
            participantRepository.save(participant);
        }

        return participant;
    }

    @Transactional
    public Participant unregisterFromEvent(Long participantId, Long eventId) {
        Participant participant = getParticipantById(participantId);
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + eventId));

        participant.getEvents().remove(event);
        participantRepository.save(participant);
        return participant;
    }
}
