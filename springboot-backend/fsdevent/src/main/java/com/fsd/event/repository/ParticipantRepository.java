package com.fsd.event.repository;

import com.fsd.event.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    Optional<Participant> findByEmail(String email);
    
    // Updated to get participants by activity ID
    List<Participant> findByActivitiesActivityId(Long activityId);
}
