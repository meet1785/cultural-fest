package com.fsd.event.controller;

import com.fsd.event.entity.EventManager;
import com.fsd.event.service.EventManagerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/managers")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class EventManagerController {
    private final EventManagerService eventManagerService;

    @GetMapping
    public List<EventManager> getAllEventManagers() {
        return eventManagerService.getAllEventManagers();
    }

    @GetMapping("/{id}")
    public EventManager getEventManagerById(@PathVariable Long id) {
        return eventManagerService.getEventManagerById(id);
    }

    @PostMapping
    public EventManager createEventManager(@RequestBody EventManager manager) {
        return eventManagerService.createEventManager(manager);
    }

    @PutMapping("/{id}")
    public EventManager updateEventManager(@PathVariable Long id, @RequestBody EventManager manager) {
        return eventManagerService.updateEventManager(id, manager);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEventManager(@PathVariable Long id) {
        eventManagerService.deleteEventManager(id);
        return ResponseEntity.ok().build();
    }
}

