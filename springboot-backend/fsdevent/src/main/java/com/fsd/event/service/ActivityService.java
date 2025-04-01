package com.fsd.event.service;

import com.fsd.event.entity.Activity;
import com.fsd.event.entity.Event;
import com.fsd.event.entity.Participant;
import com.fsd.event.repository.ActivityRepository;
import com.fsd.event.repository.EventRepository;
import com.fsd.event.repository.ParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityService {
    private final ActivityRepository activityRepository;
    private final EventRepository eventRepository;
    private final ParticipantRepository participantRepository;

    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    public List<Activity> getActivitiesByEventId(Long eventId) {
        return activityRepository.findByEventId(eventId);
    }

    public Activity getActivityById(Long id) {
        return activityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity not found with id: " + id));
    }

    @Transactional
    public Activity createActivity(Long eventId, Activity activity) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + eventId));
        activity.setEvent(event);
        return activityRepository.save(activity);
    }

    public Activity updateActivity(Long id, Activity activityDetails) {
        Activity activity = getActivityById(id);
        activity.setName(activityDetails.getName());
        activity.setDescription(activityDetails.getDescription());
        activity.setDuration(activityDetails.getDuration());
        activity.setCapacity(activityDetails.getCapacity());
        activity.setEquipmentNeeded(activityDetails.getEquipmentNeeded());
        activity.setLocation(activityDetails.getLocation());
        return activityRepository.save(activity);
    }

    public void deleteActivity(Long id) {
        Activity activity = getActivityById(id);
        activityRepository.delete(activity);
    }

    @Transactional
    public Activity registerParticipant(Long activityId, Long participantId) {
        Activity activity = getActivityById(activityId);
        Participant participant = participantRepository.findById(participantId)
                .orElseThrow(() -> new RuntimeException("Participant not found with id: " + participantId));

        if (activity.getParticipants().size() >= activity.getCapacity()) {
            throw new RuntimeException("Activity is at full capacity");
        }

        if (!activity.getParticipants().contains(participant)) {
            activity.getParticipants().add(participant);
            participant.getActivities().add(activity);
            activityRepository.save(activity);
        }

        return activity;
    }
}
