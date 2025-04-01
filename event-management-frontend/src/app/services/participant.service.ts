import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participant } from '../models/participant.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  private apiUrl = `${environment.apiUrl}/participants`;

  constructor(private http: HttpClient) { }

  // Get all participants
  getParticipants(): Observable<Participant[]> {
    return this.http.get<Participant[]>(this.apiUrl);
  }

  // Get participants for a specific event
  getParticipantsByEventId(eventId: number): Observable<Participant[]> {
    return this.http.get<Participant[]>(`${this.apiUrl}/event/${eventId}`);
  }

  // Get a specific participant by ID
  getParticipant(id: number): Observable<Participant> {
    return this.http.get<Participant>(`${this.apiUrl}/${id}`);
  }

  // Create a new participant
  createParticipant(participant: Participant): Observable<Participant> {
    return this.http.post<Participant>(this.apiUrl, participant);
  }

  // Update an existing participant
  updateParticipant(participant: Participant): Observable<Participant> {
    return this.http.put<Participant>(`${this.apiUrl}/${participant.id}`, participant);
  }

  // Delete a participant
  deleteParticipant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Register a participant for an event
  registerForEvent(participantId: number, eventId: number): Observable<Participant> {
    return this.http.post<Participant>(`${this.apiUrl}/${participantId}/register/${eventId}`, {});
  }

  // Unregister a participant from an event
  unregisterFromEvent(participantId: number, eventId: number): Observable<Participant> {
    return this.http.delete<Participant>(`${this.apiUrl}/${participantId}/register/${eventId}`);
  }
}
