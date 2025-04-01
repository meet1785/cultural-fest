package com.fsd.event.repository;

import com.fsd.event.entity.EventManager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventManagerRepository extends JpaRepository<EventManager, Long> {
    boolean existsByEmail(String email);
}
