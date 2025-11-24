# Input Validation Documentation

## Overview

This document describes the Bean Validation constraints applied to all entities in the Cultural Fest Event Management application. These validations ensure data integrity, prevent invalid input, and provide meaningful error messages to API consumers.

## Validation Framework

The application uses **Jakarta Bean Validation** (formerly JSR-380) with Hibernate Validator implementation. Validation is automatically triggered on controller methods annotated with `@Valid`.

## Entity Validation Rules

### Event Entity

| Field | Constraint | Error Message |
|-------|------------|---------------|
| `name` | @NotBlank, @Size(min=3, max=100) | "Event name is required" / "Event name must be between 3 and 100 characters" |
| `eventDateTime` | @NotNull, @Future | "Event date and time is required" / "Event date and time must be in the future" |
| `location` | @NotBlank, @Size(max=200) | "Location is required" / "Location must not exceed 200 characters" |
| `description` | @Size(max=500) | "Description must not exceed 500 characters" |
| `maxParticipants` | @Positive | "Maximum participants must be a positive number" |

### Activity Entity

| Field | Constraint | Error Message |
|-------|------------|---------------|
| `name` | @NotBlank, @Size(min=3, max=100) | "Activity name is required" / "Activity name must be between 3 and 100 characters" |
| `description` | @Size(max=500) | "Description must not exceed 500 characters" |
| `duration` | @Positive | "Duration must be a positive number (in minutes)" |
| `capacity` | @Positive | "Capacity must be a positive number" |
| `equipmentNeeded` | @Size(max=200) | "Equipment needed must not exceed 200 characters" |
| `location` | @Size(max=200) | "Location must not exceed 200 characters" |

### Participant Entity

| Field | Constraint | Error Message |
|-------|------------|---------------|
| `firstName` | @NotBlank, @Size(min=2, max=50) | "First name is required" / "First name must be between 2 and 50 characters" |
| `lastName` | @NotBlank, @Size(min=2, max=50) | "Last name is required" / "Last name must be between 2 and 50 characters" |
| `email` | @NotBlank, @Email | "Email is required" / "Email must be valid" |
| `phone` | @Pattern(regexp="^[+]?[0-9]{10,15}$") | "Phone number must be valid (10-15 digits)" |
| `address` | @Size(max=200) | "Address must not exceed 200 characters" |
| `emergencyContact` | @Size(max=100) | "Emergency contact must not exceed 100 characters" |
| `dietaryRestrictions` | @Size(max=200) | "Dietary restrictions must not exceed 200 characters" |

### EventManager Entity

| Field | Constraint | Error Message |
|-------|------------|---------------|
| `firstName` | @NotBlank, @Size(min=2, max=50) | "First name is required" / "First name must be between 2 and 50 characters" |
| `lastName` | @NotBlank, @Size(min=2, max=50) | "Last name is required" / "Last name must be between 2 and 50 characters" |
| `email` | @NotBlank, @Email | "Email is required" / "Email must be valid" |
| `phone` | @Pattern(regexp="^[+]?[0-9]{10,15}$") | "Phone number must be valid (10-15 digits)" |
| `organization` | @Size(max=100) | "Organization must not exceed 100 characters" |
| `role` | @Size(max=50) | "Role must not exceed 50 characters" |

### Venue Entity

| Field | Constraint | Error Message |
|-------|------------|---------------|
| `name` | @NotBlank, @Size(min=3, max=100) | "Venue name is required" / "Venue name must be between 3 and 100 characters" |
| `location` | @NotBlank, @Size(max=200) | "Location is required" / "Location must not exceed 200 characters" |
| `capacity` | @Positive | "Capacity must be a positive number" |

## Error Response Format

When validation fails, the API returns a structured error response with HTTP status 400 (Bad Request):

```json
{
  "timestamp": "2025-11-22T12:30:45.123",
  "status": 400,
  "error": "Validation Failed",
  "validationErrors": {
    "fieldName1": "Error message for field 1",
    "fieldName2": "Error message for field 2"
  }
}
```

### Example Error Response

Request with invalid event data:
```json
POST /api/events
{
  "name": "AB",
  "eventDateTime": "2024-01-01T10:00:00",
  "location": "",
  "maxParticipants": -5
}
```

Response:
```json
{
  "timestamp": "2025-11-22T12:30:45.123",
  "status": 400,
  "error": "Validation Failed",
  "validationErrors": {
    "name": "Event name must be between 3 and 100 characters",
    "eventDateTime": "Event date and time must be in the future",
    "location": "Location is required",
    "maxParticipants": "Maximum participants must be a positive number"
  }
}
```

## Usage in API Clients

When integrating with this API:

1. **Validate on the client side** before sending requests to reduce round trips
2. **Handle 400 errors** gracefully by displaying field-specific error messages
3. **Check the `validationErrors` object** to identify which fields failed validation
4. **Display user-friendly messages** based on the error messages provided

## Testing

Comprehensive integration tests are provided in `ValidationIntegrationTest.java` covering:
- Individual field validation failures
- Multiple field validation failures
- All entity types (Event, Activity, Participant, EventManager, Venue)

Run tests with: `./mvnw test -Dtest=ValidationIntegrationTest`

## Benefits

1. **Data Integrity**: Prevents invalid data from entering the database
2. **Security**: Protects against malformed or malicious input
3. **User Experience**: Provides clear, actionable error messages
4. **Developer Experience**: Validation rules are declarative and easy to understand
5. **Consistency**: Validation rules are enforced across all API endpoints
