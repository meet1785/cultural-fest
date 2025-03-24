import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = 'api/activities';
  
  // Mock data for development
  private mockActivities: Activity[] = [
    {
      id: 1,
      name: 'Workshop on Cloud Computing',
      description: 'Learn about cloud services and implementation',
      duration: 120, // 2 hours
      capacity: 50,
      equipmentNeeded: 'Laptop, internet connection',
      location: 'Room A, 2nd Floor',
      eventId: 1
    },
    {
      id: 2,
      name: 'Networking Session',
      description: 'Connect with industry professionals',
      duration: 60, // 1 hour
      capacity: 100,
      equipmentNeeded: 'None',
      location: 'Main Hall',
      eventId: 1
    },
    {
      id: 3,
      name: 'Basketball Tournament',
      description: 'Team basketball competition',
      duration: 180, // 3 hours
      capacity: 40,
      equipmentNeeded: 'Sports attire',
      location: 'Indoor Court',
      eventId: 2
    }
  ];

  constructor(private http: HttpClient) { }

  // Get all activities
  getActivities(): Observable<Activity[]> {
    return of(this.mockActivities);
    // In production: return this.http.get<Activity[]>(this.apiUrl);
  }

  // Get activities for a specific event
  getActivitiesByEventId(eventId: number): Observable<Activity[]> {
    const activities = this.mockActivities.filter(a => a.eventId === eventId);
    return of(activities);
    // In production: return this.http.get<Activity[]>(`${this.apiUrl}?eventId=${eventId}`);
  }

  // Get a specific activity by ID
  getActivity(id: number): Observable<Activity> {
    const activity = this.mockActivities.find(a => a.id === id);
    return of(activity!);
    // In production: return this.http.get<Activity>(`${this.apiUrl}/${id}`);
  }

  // Create a new activity
  createActivity(activity: Activity): Observable<Activity> {
    const newId = Math.max(...this.mockActivities.map(a => a.id || 0)) + 1;
    const newActivity = { ...activity, id: newId };
    this.mockActivities.push(newActivity);
    return of(newActivity);
    // In production: return this.http.post<Activity>(this.apiUrl, activity);
  }

  // Update an existing activity
  updateActivity(activity: Activity): Observable<Activity> {
    const index = this.mockActivities.findIndex(a => a.id === activity.id);
    if (index !== -1) {
      this.mockActivities[index] = { ...activity };
      return of(this.mockActivities[index]);
    }
    throw new Error('Activity not found');
    // In production: return this.http.put<Activity>(`${this.apiUrl}/${activity.id}`, activity);
  }

  // Delete an activity
  deleteActivity(id: number): Observable<void> {
    const index = this.mockActivities.findIndex(a => a.id === id);
    if (index !== -1) {
      this.mockActivities.splice(index, 1);
      return of(undefined);
    }
    throw new Error('Activity not found');
    // In production: return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
