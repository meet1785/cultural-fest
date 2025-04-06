package com.fsd.event.repository;

import com.fsd.event.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    Optional<Participant> findByEmail(String email);
    List<Participant> findByEventsEventId(Long eventId);  // Changed from findByEventsId
    List<Participant> findByActivitiesActivityId(Long activityId);
}
