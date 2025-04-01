package com.fsd.event.controller;

import com.fsd.event.entity.Activity;
import com.fsd.event.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ActivityController {
    private final ActivityService activityService;

    @GetMapping
    public List<Activity> getAllActivities() {
        return activityService.getAllActivities();
    }

    @GetMapping("/event/{eventId}")
    public List<Activity> getActivitiesByEventId(@PathVariable Long eventId) {
        return activityService.getActivitiesByEventId(eventId);
    }

    @GetMapping("/{id}")
    public Activity getActivityById(@PathVariable Long id) {
        return activityService.getActivityById(id);
    }

    @PostMapping("/event/{eventId}")
    public Activity createActivity(@PathVariable Long eventId, @RequestBody Activity activity) {
        return activityService.createActivity(eventId, activity);
    }

    @PutMapping("/{id}")
    public Activity updateActivity(@PathVariable Long id, @RequestBody Activity activity) {
        return activityService.updateActivity(id, activity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActivity(@PathVariable Long id) {
        activityService.deleteActivity(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{activityId}/register/{participantId}")
    public Activity registerParticipant(
            @PathVariable Long activityId,
            @PathVariable Long participantId) {
        return activityService.registerParticipant(activityId, participantId);
    }
}
