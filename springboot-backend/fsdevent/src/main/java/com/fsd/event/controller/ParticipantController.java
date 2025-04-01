package com.fsd.event.controller;

import com.fsd.event.entity.Participant;
import com.fsd.event.service.ParticipantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/participants")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ParticipantController {
    private final ParticipantService participantService;

    @GetMapping
    public List<Participant> getAllParticipants() {
        return participantService.getAllParticipants();
    }

    @GetMapping("/{id}")
    public Participant getParticipantById(@PathVariable Long id) {
        return participantService.getParticipantById(id);
    }

    @GetMapping("/event/{eventId}")
    public List<Participant> getParticipantsByEventId(@PathVariable Long eventId) {
        return participantService.getParticipantsByEventId(eventId);
    }

    @PostMapping
    public Participant createParticipant(@RequestBody Participant participant) {
        return participantService.createParticipant(participant);
    }

    @PutMapping("/{id}")
    public Participant updateParticipant(@PathVariable Long id, @RequestBody Participant participant) {
        return participantService.updateParticipant(id, participant);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParticipant(@PathVariable Long id) {
        participantService.deleteParticipant(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{participantId}/register/{eventId}")
    public Participant registerForEvent(
            @PathVariable Long participantId,
            @PathVariable Long eventId) {
        return participantService.registerForEvent(participantId, eventId);
    }

    @DeleteMapping("/{participantId}/register/{eventId}")
    public Participant unregisterFromEvent(
            @PathVariable Long participantId,
            @PathVariable Long eventId) {
        return participantService.unregisterFromEvent(participantId, eventId);
    }
}
