import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participant } from '../models/participant.model';
import { Activity } from '../models/activity.model';
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

  // Get participants by activity
  getParticipantsByActivity(activityId: number): Observable<Participant[]> {
    return this.http.get<Participant[]>(`${environment.apiUrl}/activities/${activityId}/participants`);
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
    return this.http.put<Participant>(`${this.apiUrl}/${participant.participantId}`, participant);
  }

  // Delete a participant
  deleteParticipant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Register for an activity (this follows the schema for participant_activity)
  registerForActivity(participantId: number, activityId: number): Observable<Participant> {
    return this.http.post<Participant>(`${this.apiUrl}/${participantId}/register/${activityId}`, {});
  }

  // Get activities by participant
  getActivitiesByParticipant(participantId: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/${participantId}/activities`);
  }
}
