package com.fsd.event.validation;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fsd.event.entity.Event;
import com.fsd.event.entity.Participant;
import com.fsd.event.entity.Activity;
import com.fsd.event.entity.EventManager;
import com.fsd.event.entity.Venue;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for Bean Validation across all entities.
 * Tests ensure that invalid data is properly rejected with meaningful error messages.
 */
@SpringBootTest
@AutoConfigureMockMvc
public class ValidationIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testEventValidation_BlankName_ShouldReturnBadRequest() throws Exception {
        Event event = new Event();
        event.setName("");  // Invalid: blank name
        event.setEventDateTime(LocalDateTime.now().plusDays(1));
        event.setLocation("Test Location");

        mockMvc.perform(post("/api/events")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(event)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Validation Failed"))
                .andExpect(jsonPath("$.validationErrors.name").exists());
    }

    @Test
    public void testEventValidation_PastDate_ShouldReturnBadRequest() throws Exception {
        Event event = new Event();
        event.setName("Valid Event Name");
        event.setEventDateTime(LocalDateTime.now().minusDays(1));  // Invalid: past date
        event.setLocation("Test Location");

        mockMvc.perform(post("/api/events")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(event)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.validationErrors.eventDateTime").exists());
    }

    @Test
    public void testEventValidation_NegativeMaxParticipants_ShouldReturnBadRequest() throws Exception {
        Event event = new Event();
        event.setName("Valid Event Name");
        event.setEventDateTime(LocalDateTime.now().plusDays(1));
        event.setLocation("Test Location");
        event.setMaxParticipants(-10);  // Invalid: negative number

        mockMvc.perform(post("/api/events")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(event)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.validationErrors.maxParticipants").exists());
    }

    @Test
    public void testParticipantValidation_InvalidEmail_ShouldReturnBadRequest() throws Exception {
        Participant participant = new Participant();
        participant.setFirstName("John");
        participant.setLastName("Doe");
        participant.setEmail("invalid-email");  // Invalid: not a valid email format

        mockMvc.perform(post("/api/participants")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(participant)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.validationErrors.email").exists());
    }

    @Test
    public void testParticipantValidation_ShortFirstName_ShouldReturnBadRequest() throws Exception {
        Participant participant = new Participant();
        participant.setFirstName("J");  // Invalid: too short
        participant.setLastName("Doe");
        participant.setEmail("john.doe@example.com");

        mockMvc.perform(post("/api/participants")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(participant)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.validationErrors.firstName").exists());
    }

    @Test
    public void testActivityValidation_BlankName_ShouldReturnBadRequest() throws Exception {
        Activity activity = new Activity();
        activity.setName("");  // Invalid: blank name

        mockMvc.perform(post("/api/activities/event/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(activity)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.validationErrors.name").exists());
    }

    @Test
    public void testActivityValidation_NegativeDuration_ShouldReturnBadRequest() throws Exception {
        Activity activity = new Activity();
        activity.setName("Valid Activity Name");
        activity.setDuration(-30);  // Invalid: negative duration

        mockMvc.perform(post("/api/activities/event/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(activity)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.validationErrors.duration").exists());
    }

    @Test
    public void testEventManagerValidation_InvalidEmail_ShouldReturnBadRequest() throws Exception {
        EventManager manager = new EventManager();
        manager.setFirstName("John");
        manager.setLastName("Manager");
        manager.setEmail("not-an-email");  // Invalid: not a valid email

        mockMvc.perform(post("/api/managers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(manager)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.validationErrors.email").exists());
    }

    @Test
    public void testVenueValidation_BlankName_ShouldReturnBadRequest() throws Exception {
        Venue venue = new Venue();
        venue.setName("");  // Invalid: blank name
        venue.setLocation("Test Location");

        mockMvc.perform(post("/api/venues")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(venue)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.validationErrors.name").exists());
    }

    @Test
    public void testVenueValidation_NegativeCapacity_ShouldReturnBadRequest() throws Exception {
        Venue venue = new Venue();
        venue.setName("Valid Venue Name");
        venue.setLocation("Test Location");
        venue.setCapacity(-100);  // Invalid: negative capacity

        mockMvc.perform(post("/api/venues")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(venue)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.validationErrors.capacity").exists());
    }

    @Test
    public void testParticipantValidation_MultipleErrors_ShouldReturnAllErrors() throws Exception {
        Participant participant = new Participant();
        participant.setFirstName("J");  // Too short
        participant.setLastName("D");   // Too short
        participant.setEmail("bad");    // Invalid email

        mockMvc.perform(post("/api/participants")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(participant)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.validationErrors.firstName").exists())
                .andExpect(jsonPath("$.validationErrors.lastName").exists())
                .andExpect(jsonPath("$.validationErrors.email").exists());
    }
}
