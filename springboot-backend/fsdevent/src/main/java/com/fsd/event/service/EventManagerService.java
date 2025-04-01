package com.fsd.event.service;

import com.fsd.event.entity.EventManager;
import com.fsd.event.repository.EventManagerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventManagerService {
    private final EventManagerRepository eventManagerRepository;

    public List<EventManager> getAllEventManagers() {
        return eventManagerRepository.findAll();
    }

    public EventManager getEventManagerById(Long id) {
        return eventManagerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event Manager not found with id: " + id));
    }

    public EventManager createEventManager(EventManager manager) {
        if (eventManagerRepository.existsByEmail(manager.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        return eventManagerRepository.save(manager);
    }

    public EventManager updateEventManager(Long id, EventManager managerDetails) {
        EventManager manager = getEventManagerById(id);
        
        // Check if email is being changed and if new email exists
        if (!manager.getEmail().equals(managerDetails.getEmail()) && 
            eventManagerRepository.existsByEmail(managerDetails.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        manager.setFirstName(managerDetails.getFirstName());
        manager.setLastName(managerDetails.getLastName());
        manager.setEmail(managerDetails.getEmail());
        manager.setPhone(managerDetails.getPhone());
        manager.setOrganization(managerDetails.getOrganization());
        manager.setRole(managerDetails.getRole());
        
        return eventManagerRepository.save(manager);
    }

    public void deleteEventManager(Long id) {
        EventManager manager = getEventManagerById(id);
        eventManagerRepository.delete(manager);
    }
}
