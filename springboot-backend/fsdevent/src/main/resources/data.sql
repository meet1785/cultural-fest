-- Event Managers
INSERT INTO event_manager (first_name, last_name, email, phone, organization, role)
SELECT 'John', 'Smith', 'john.smith@example.com', '555-0101', 'Tech Events Inc', 'Senior Coordinator'
WHERE NOT EXISTS (SELECT 1 FROM event_manager WHERE email = 'john.smith@example.com');

INSERT INTO event_manager (first_name, last_name, email, phone, organization, role)
SELECT 'Sarah', 'Johnson', 'sarah.j@example.com', '555-0102', 'Event Masters', 'Event Director'
WHERE NOT EXISTS (SELECT 1 FROM event_manager WHERE email = 'sarah.j@example.com');

-- Events
INSERT INTO event (name, description, date, location, max_participants, organizer_id)
SELECT 'Tech Conference 2024', 'Annual technology conference featuring the latest innovations', '2024-06-15', 'Convention Center', 200, 1
WHERE NOT EXISTS (SELECT 1 FROM event WHERE name = 'Tech Conference 2024' AND date = '2024-06-15');

INSERT INTO event (name, description, date, location, max_participants, organizer_id)
SELECT 'Coding Workshop', 'Hands-on coding workshop for beginners', '2024-07-01', 'Tech Hub', 50, 2
WHERE NOT EXISTS (SELECT 1 FROM event WHERE name = 'Coding Workshop' AND date = '2024-07-01');

-- Activities
INSERT INTO activity (name, description, duration, capacity, equipment_needed, location, event_id)
SELECT 'Web Development 101', 'Introduction to web development basics', 120, 30, 'Laptop', 'Room A101', 1
WHERE NOT EXISTS (SELECT 1 FROM activity WHERE name = 'Web Development 101' AND event_id = 1);

INSERT INTO activity (name, description, duration, capacity, equipment_needed, location, event_id)
SELECT 'AI Workshop', 'Artificial Intelligence basics and applications', 90, 25, 'Laptop with Python', 'Room B102', 1
WHERE NOT EXISTS (SELECT 1 FROM activity WHERE name = 'AI Workshop' AND event_id = 1);

INSERT INTO activity (name, description, duration, capacity, equipment_needed, location, event_id)
SELECT 'Mobile App Development', 'Building mobile apps from scratch', 180, 20, 'Laptop with Android Studio', 'Room C103', 2
WHERE NOT EXISTS (SELECT 1 FROM activity WHERE name = 'Mobile App Development' AND event_id = 2);

-- Participants
INSERT INTO participant (first_name, last_name, email, phone, address, emergency_contact, dietary_restrictions)
SELECT 'Alice', 'Brown', 'alice.b@example.com', '555-0201', '123 Main St', 'Bob Brown: 555-0202', 'Vegetarian'
WHERE NOT EXISTS (SELECT 1 FROM participant WHERE email = 'alice.b@example.com');

INSERT INTO participant (first_name, last_name, email, phone, address, emergency_contact, dietary_restrictions)
SELECT 'David', 'Wilson', 'david.w@example.com', '555-0203', '456 Oak Ave', 'Mary Wilson: 555-0204', NULL
WHERE NOT EXISTS (SELECT 1 FROM participant WHERE email = 'david.w@example.com');

-- Event-Participant relationships
INSERT INTO event_participant (event_id, participant_id)
SELECT e.id, p.id
FROM event e, participant p
WHERE e.name = 'Tech Conference 2024' AND p.email = 'alice.b@example.com'
AND NOT EXISTS (
    SELECT 1 FROM event_participant ep 
    WHERE ep.event_id = e.id AND ep.participant_id = p.id
);

INSERT INTO event_participant (event_id, participant_id)
SELECT e.id, p.id
FROM event e, participant p
WHERE e.name = 'Coding Workshop' AND p.email IN ('alice.b@example.com', 'david.w@example.com')
AND NOT EXISTS (
    SELECT 1 FROM event_participant ep 
    WHERE ep.event_id = e.id AND ep.participant_id = p.id
);

-- Activity-Participant relationships
INSERT INTO activity_participant (activity_id, participant_id)
SELECT a.id, p.id
FROM activity a, participant p
WHERE a.name IN ('Web Development 101', 'AI Workshop') AND p.email = 'alice.b@example.com'
AND NOT EXISTS (
    SELECT 1 FROM activity_participant ap 
    WHERE ap.activity_id = a.id AND ap.participant_id = p.id
);

INSERT INTO activity_participant (activity_id, participant_id)
SELECT a.id, p.id
FROM activity a, participant p
WHERE a.name = 'Mobile App Development' AND p.email = 'david.w@example.com'
AND NOT EXISTS (
    SELECT 1 FROM activity_participant ap 
    WHERE ap.activity_id = a.id AND ap.participant_id = p.id
);