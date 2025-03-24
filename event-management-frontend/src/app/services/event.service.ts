import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  // For demo purposes, we'll use a mock API URL
  private apiUrl = 'api/events';
  
  // Mock data for development
  private mockEvents: Event[] = [
    {
      id: 1,
      name: 'Annual Tech Conference',
      description: 'A conference focused on the latest technologies',
      date: new Date('2023-12-15'),
      location: 'Convention Center, New York',
      maxParticipants: 500,
      organizerId: 1
    },
    {
      id: 2,
      name: 'Sports Tournament',
      description: 'Annual sports competition',
      date: new Date('2023-11-05'),
      location: 'City Stadium',
      maxParticipants: 200,
      organizerId: 2
    }
  ];

  constructor(private http: HttpClient) { }

  // Get all events
  getEvents(): Observable<Event[]> {
    // For development, return mock data
    return of(this.mockEvents);
    
    // In production, you would use:
    // return this.http.get<Event[]>(this.apiUrl);
  }

  // Get a specific event by ID
  getEvent(id: number): Observable<Event> {
    const event = this.mockEvents.find(e => e.id === id);
    return of(event!);
    
    // In production:
    // return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  // Create a new event
  createEvent(event: Event): Observable<Event> {
    const newId = Math.max(...this.mockEvents.map(e => e.id || 0)) + 1;
    const newEvent = { ...event, id: newId };
    this.mockEvents.push(newEvent);
    return of(newEvent);
    
    // In production:
    // return this.http.post<Event>(this.apiUrl, event);
  }

  // Update an existing event
  updateEvent(event: Event): Observable<Event> {
    const index = this.mockEvents.findIndex(e => e.id === event.id);
    if (index !== -1) {
      this.mockEvents[index] = { ...event };
      return of(this.mockEvents[index]);
    }
    throw new Error('Event not found');
    
    // In production:
    // return this.http.put<Event>(`${this.apiUrl}/${event.id}`, event);
  }

  // Delete an event
  deleteEvent(id: number): Observable<void> {
    const index = this.mockEvents.findIndex(e => e.id === id);
    if (index !== -1) {
      this.mockEvents.splice(index, 1);
      return of(undefined);
    }
    throw new Error('Event not found');
    
    // In production:
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
