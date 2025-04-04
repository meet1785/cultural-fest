import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventManager } from '../models/event-manager.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {
  private apiUrl = `${environment.apiUrl}/event-managers`;

  constructor(private http: HttpClient) { }

  // Get all event managers
  getEventManagers(): Observable<EventManager[]> {
    return this.http.get<EventManager[]>(this.apiUrl);
  }

  // Get a specific event manager by ID
  getEventManager(id: number): Observable<EventManager> {
    return this.http.get<EventManager>(`${this.apiUrl}/${id}`);
  }

  // Create a new event manager
  createEventManager(manager: EventManager): Observable<EventManager> {
    return this.http.post<EventManager>(this.apiUrl, manager);
  }

  // Update an existing event manager
  updateEventManager(manager: EventManager): Observable<EventManager> {
    return this.http.put<EventManager>(`${this.apiUrl}/${manager.managerId}`, manager);
  }

  // Delete an event manager
  deleteEventManager(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
