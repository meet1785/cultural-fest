# Event Management Application

This project is a full-stack event management application built with Angular for the frontend and Spring Boot for the backend. It supports PostgreSQL as the database.

## Features
- Manage events, activities, participants, and event managers.
- RESTful API for backend services.
- Responsive frontend built with Angular.
- **Comprehensive input validation** with Bean Validation for data integrity and security.
- Structured error responses with field-specific validation messages.

## Technologies Used
### Frontend
- Angular
- TypeScript
- HTML/CSS

### Backend
- Spring Boot
- Java 17
- PostgreSQL / H2 (for testing)
- Jakarta Bean Validation (Hibernate Validator)

## Setup Instructions

### Prerequisites
- Node.js and npm
- Java 17 or higher
- PostgreSQL (optional - H2 in-memory database is used by default for development)
- Maven

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd springboot-backend/fsdevent
   ```
2. Update the PostgreSQL credentials in `application.properties`.
3. Build the project:
   ```bash
   ./mvnw clean install
   ```
4. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd event-management-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   ng serve --proxy-config proxy.conf.json
   ```

### Running the Application
- Access the frontend at `http://localhost:4200`.
- The backend API is available at `http://localhost:8080/api`.

## Input Validation

This application includes comprehensive input validation to ensure data integrity and security. See [VALIDATION.md](VALIDATION.md) for detailed documentation on:
- Validation rules for all entities
- Error response format
- Example requests and responses
- Integration with API clients

## Testing

### Backend Tests
Run all backend tests:
```bash
cd springboot-backend/fsdevent
./mvnw test
```

Run validation tests only:
```bash
./mvnw test -Dtest=ValidationIntegrationTest
```

## Deployment
- Update the production `apiUrl` in `environment.prod.ts`.
- Build the frontend for production:
  ```bash
  ng build --prod
  ```
- Deploy the backend and frontend to your server.

## License
This project is licensed under the MIT License.