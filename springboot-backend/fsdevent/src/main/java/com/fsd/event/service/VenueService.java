package com.fsd.event.service;

import com.fsd.event.entity.Venue;
import com.fsd.event.repository.VenueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VenueService {
    private final VenueRepository venueRepository;
    
    public List<Venue> getAllVenues() {
        return venueRepository.findAll();
    }
    
    public Venue getVenueById(Long id) {
        return venueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venue not found with id: " + id));
    }
    
    public Venue createVenue(Venue venue) {
        return venueRepository.save(venue);
    }
    
    public Venue updateVenue(Long id, Venue venueDetails) {
        Venue venue = getVenueById(id);
        
        venue.setName(venueDetails.getName());
        venue.setLocation(venueDetails.getLocation());
        venue.setCapacity(venueDetails.getCapacity());
        
        return venueRepository.save(venue);
    }
    
    public void deleteVenue(Long id) {
        Venue venue = getVenueById(id);
        venueRepository.delete(venue);
    }
}