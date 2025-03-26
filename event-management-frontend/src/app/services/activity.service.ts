import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = '/api/activities';

  constructor(private http: HttpClient) { }

  // Get all activities
  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.apiUrl);
  }

  // Get activities for a specific event
  getActivitiesByEventId(eventId: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/event/${eventId}`);
  }

  // Get a specific activity by ID
  getActivity(id: number): Observable<Activity> {
    return this.http.get<Activity>(`${this.apiUrl}/${id}`);
  }

  // Create a new activity
  createActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(`${this.apiUrl}/event/${activity.eventId}`, activity);
  }

  // Update an existing activity
  updateActivity(activity: Activity): Observable<Activity> {
    return this.http.put<Activity>(`${this.apiUrl}/${activity.id}`, activity);
  }

  // Delete an activity
  deleteActivity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get participants for an activity
  getParticipantsForActivity(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/participants`);
  }
}
