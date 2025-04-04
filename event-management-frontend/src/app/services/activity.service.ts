import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../models/activity.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = `${environment.apiUrl}/activities`;

  constructor(private http: HttpClient) { }

  // Get all activities
  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.apiUrl);
  }

  // Get activities by event
  getActivitiesByEvent(eventId: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${environment.apiUrl}/events/${eventId}/activities`);
  }

  // Get activities by venue
  getActivitiesByVenue(venueId: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${environment.apiUrl}/venues/${venueId}/activities`);
  }

  // Get a specific activity by ID
  getActivity(id: number): Observable<Activity> {
    return this.http.get<Activity>(`${this.apiUrl}/${id}`);
  }

  // Create a new activity
  createActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.apiUrl, activity);
  }

  // Update an existing activity
  updateActivity(activity: Activity): Observable<Activity> {
    return this.http.put<Activity>(`${this.apiUrl}/${activity.activityId}`, activity);
  }

  // Delete an activity
  deleteActivity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Register a participant for an activity
  registerParticipant(activityId: number, participantId: number): Observable<Activity> {
    return this.http.post<Activity>(`${this.apiUrl}/${activityId}/register/${participantId}`, {});
  }

  // Get activities by event ID
  getActivitiesByEventId(eventId: number): Observable<Activity[]> {
    return this.getActivitiesByEvent(eventId);
  }
}
