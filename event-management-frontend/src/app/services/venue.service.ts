import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venue } from '../models/venue.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VenueService {
  private apiUrl = `${environment.apiUrl}/venues`;

  constructor(private http: HttpClient) { }

  getVenues(): Observable<Venue[]> {
    return this.http.get<Venue[]>(this.apiUrl);
  }

  getVenue(id: number): Observable<Venue> {
    return this.http.get<Venue>(`${this.apiUrl}/${id}`);
  }

  createVenue(venue: Venue): Observable<Venue> {
    return this.http.post<Venue>(this.apiUrl, venue);
  }

  updateVenue(id: number, venue: Venue): Observable<Venue> {
    return this.http.put<Venue>(`${this.apiUrl}/${id}`, venue);
  }

  deleteVenue(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}