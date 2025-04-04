import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VenueService } from './venue.service';
import { Venue } from '../models/venue.model';
import { environment } from '../../environments/environment';

describe('VenueService', () => {
  let service: VenueService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/venues`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VenueService]
    });
    service = TestBed.inject(VenueService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all venues', () => {
    const mockVenues: Venue[] = [
      { venueId: 1, name: 'Main Hall', capacity: 500 },
      { venueId: 2, name: 'Conference Room A', capacity: 100 }
    ];

    service.getVenues().subscribe(venues => {
      expect(venues.length).toBe(2);
      expect(venues).toEqual(mockVenues);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockVenues);
  });

  it('should get a venue by id', () => {
    const mockVenue: Venue = { venueId: 1, name: 'Main Hall', capacity: 500 };

    service.getVenue(1).subscribe(venue => {
      expect(venue).toEqual(mockVenue);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockVenue);
  });

  it('should create a new venue', () => {
    const newVenue: Venue = { name: 'New Venue', capacity: 200 };
    const mockResponse: Venue = { venueId: 3, name: 'New Venue', capacity: 200 };

    service.createVenue(newVenue).subscribe(venue => {
      expect(venue).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newVenue);
    req.flush(mockResponse);
  });

  it('should update a venue', () => {
    const updatedVenue: Venue = { venueId: 1, name: 'Updated Venue', capacity: 300 };

    service.updateVenue(1, updatedVenue).subscribe(venue => {
      expect(venue).toEqual(updatedVenue);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedVenue);
    req.flush(updatedVenue);
  });

  it('should delete a venue', () => {
    service.deleteVenue(1).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});