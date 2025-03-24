import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EventManager } from '../models/event-manager.model';

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {
  private apiUrl = 'api/managers';
  
  // Mock data for development
  private mockManagers: EventManager[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      phone: '555-123-4567',
      organization: 'Tech Events Inc.',
      role: 'Senior Event Coordinator',
      managedEvents: [1]
    },
    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.j@example.com',
      phone: '555-987-6543',
      organization: 'Sports League Association',
      role: 'Event Director',
      managedEvents: [2]
    }
  ];

  constructor(private http: HttpClient) { }

  // Get all event managers
  getEventManagers(): Observable<EventManager[]> {
    return of(this.mockManagers);
    // In production: return this.http.get<EventManager[]>(this.apiUrl);
  }

  // Get a specific event manager by ID
  getEventManager(id: number): Observable<EventManager> {
    const manager = this.mockManagers.find(m => m.id === id);
    return of(manager!);
    // In production: return this.http.get<EventManager>(`${this.apiUrl}/${id}`);
  }

  // Create a new event manager
  createEventManager(manager: EventManager): Observable<EventManager> {
    const newId = Math.max(...this.mockManagers.map(m => m.id || 0)) + 1;
    const newManager = { ...manager, id: newId, managedEvents: [] };
    this.mockManagers.push(newManager);
    return of(newManager);
    // In production: return this.http.post<EventManager>(this.apiUrl, manager);
  }

  // Update an existing event manager
  updateEventManager(manager: EventManager): Observable<EventManager> {
    const index = this.mockManagers.findIndex(m => m.id === manager.id);
    if (index !== -1) {
      this.mockManagers[index] = { ...manager };
      return of(this.mockManagers[index]);
    }
    throw new Error('Event manager not found');
    // In production: return this.http.put<EventManager>(`${this.apiUrl}/${manager.id}`, manager);
  }

  // Delete an event manager
  deleteEventManager(id: number): Observable<void> {
    const index = this.mockManagers.findIndex(m => m.id === id);
    if (index !== -1) {
      this.mockManagers.splice(index, 1);
      return of(undefined);
    }
    throw new Error('Event manager not found');
    // In production: return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
