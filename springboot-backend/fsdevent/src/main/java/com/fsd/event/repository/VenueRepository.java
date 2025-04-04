package com.fsd.event.repository;

import com.fsd.event.entity.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VenueRepository extends JpaRepository<Venue, Long> {
    // You can add custom query methods here if needed
}