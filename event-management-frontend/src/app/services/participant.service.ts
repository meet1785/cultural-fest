import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Participant } from '../models/participant.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  private apiUrl = 'api/participants';
  
  // Mock data for development
  private mockParticipants: Participant[] = [
    {
      id: 1,
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.j@example.com',
      phone: '555-111-2222',
      address: '123 Main St, Anytown, USA',
      emergencyContact: 'Sarah Johnson: 555-333-4444',
      dietaryRestrictions: 'Vegetarian',
      eventsRegistered: [1]
    },
    {
      id: 2,
      firstName: 'Emily',
      lastName: 'Williams',
      email: 'emily.w@example.com',
      phone: '555-555-6666',
      address: '456 Oak Ave, Othertown, USA',
      emergencyContact: 'David Williams: 555-777-8888',
      eventsRegistered: [1, 2]
    },
    {
      id: 3,
      firstName: 'Robert',
      lastName: 'Brown',
      email: 'robert.b@example.com',
      phone: '555-999-0000',
      address: '789 Pine St, Somewhere, USA',
      emergencyContact: 'Jennifer Brown: 555-123-4567',
      dietaryRestrictions: 'Gluten-free',
      eventsRegistered: [2]
    }
  ];

  constructor(private http: HttpClient) { }

  // Get all participants
  getParticipants(): Observable<Participant[]> {
    return of(this.mockParticipants);
    // In production: return this.http.get<Participant[]>(this.apiUrl);
  }

  // Get participants for a specific event
  getParticipantsByEventId(eventId: number): Observable<Participant[]> {
    const participants = this.mockParticipants.filter(
      p => p.eventsRegistered?.includes(eventId)
    );
    return of(participants);
    // In production: return this.http.get<Participant[]>(`${this.apiUrl}?eventId=${eventId}`);
  }

  // Get a specific participant by ID
  getParticipant(id: number): Observable<Participant> {
    const participant = this.mockParticipants.find(p => p.id === id);
    return of(participant!);
    // In production: return this.http.get<Participant>(`${this.apiUrl}/${id}`);
  }

  // Create a new participant
  createParticipant(participant: Participant): Observable<Participant> {
    const newId = Math.max(...this.mockParticipants.map(p => p.id || 0)) + 1;
    const newParticipant = { ...participant, id: newId };
    this.mockParticipants.push(newParticipant);
    return of(newParticipant);
    // In production: return this.http.post<Participant>(this.apiUrl, participant);
  }

  // Update an existing participant
  updateParticipant(participant: Participant): Observable<Participant> {
    const index = this.mockParticipants.findIndex(p => p.id === participant.id);
    if (index !== -1) {
      this.mockParticipants[index] = { ...participant };
      return of(this.mockParticipants[index]);
    }
    throw new Error('Participant not found');
    // In production: return this.http.put<Participant>(`${this.apiUrl}/${participant.id}`, participant);
  }

  // Delete a participant
  deleteParticipant(id: number): Observable<void> {
    const index = this.mockParticipants.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockParticipants.splice(index, 1);
      return of(undefined);
    }
    throw new Error('Participant not found');
    // In production: return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Register a participant for an event
  registerForEvent(participantId: number, eventId: number): Observable<Participant> {
    const index = this.mockParticipants.findIndex(p => p.id === participantId);
    if (index !== -1) {
      if (!this.mockParticipants[index].eventsRegistered) {
        this.mockParticipants[index].eventsRegistered = [];
      }
      if (!this.mockParticipants[index].eventsRegistered!.includes(eventId)) {
        this.mockParticipants[index].eventsRegistered!.push(eventId);
      }
      return of(this.mockParticipants[index]);
    }
    throw new Error('Participant not found');
    // In production: return this.http.post<Participant>(`${this.apiUrl}/${participantId}/register/${eventId}`, {});
  }

  // Unregister a participant from an event
  unregisterFromEvent(participantId: number, eventId: number): Observable<Participant> {
    const index = this.mockParticipants.findIndex(p => p.id === participantId);
    if (index !== -1 && this.mockParticipants[index].eventsRegistered) {
      const eventIndex = this.mockParticipants[index].eventsRegistered!.indexOf(eventId);
      if (eventIndex !== -1) {
        this.mockParticipants[index].eventsRegistered!.splice(eventIndex, 1);
      }
      return of(this.mockParticipants[index]);
    }
    throw new Error('Participant not found or not registered for this event');
    // In production: return this.http.delete<Participant>(`${this.apiUrl}/${participantId}/register/${eventId}`);
  }
}
