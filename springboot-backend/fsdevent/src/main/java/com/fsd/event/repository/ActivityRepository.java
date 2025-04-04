package com.fsd.event.repository;

import com.fsd.event.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByEventEventId(Long eventId);
    List<Activity> findByVenueVenueId(Long venueId);
}
