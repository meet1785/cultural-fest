import { Component, OnInit } from '@angular/core';
import { Venue } from '../../../models/venue.model';
import { VenueService } from '../../../services/venue.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-venue-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.css']
})
export class VenueListComponent implements OnInit {
  venues: Venue[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private venueService: VenueService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadVenues();
  }

  loadVenues(): void {
    this.loading = true;
    this.venueService.getVenues().subscribe({
      next: (data) => {
        this.venues = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load venues. Please try again later.';
        this.loading = false;
        console.error('Error loading venues', err);
      }
    });
  }

  goToDetails(id: number): void {
    this.router.navigate(['/venues', id]);
  }

  goToCreate(): void {
    this.router.navigate(['/venues/create']);
  }

  deleteVenue(id: number, event: Event): void {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this venue?')) {
      this.venueService.deleteVenue(id).subscribe({
        next: () => {
          this.venues = this.venues.filter(venue => venue.venueId !== id);
        },
        error: (err) => {
          console.error('Error deleting venue', err);
          alert('Failed to delete venue. It may be in use by activities.');
        }
      });
    }
  }
}