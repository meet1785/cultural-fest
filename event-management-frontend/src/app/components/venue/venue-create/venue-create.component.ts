import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Venue } from '../../../models/venue.model';
import { VenueService } from '../../../services/venue.service';

@Component({
  selector: 'app-venue-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './venue-create.component.html',
  styleUrls: ['./venue-create.component.css']
})
export class VenueCreateComponent {
  venue: Venue = {
    name: '',
    location: '',
    capacity: undefined
  };
  
  loading = false;
  errorMessage = '';
  
  constructor(
    private venueService: VenueService,
    private router: Router
  ) { }
  
  saveVenue(): void {
    if (!this.validateForm()) {
      return;
    }
    
    this.loading = true;
    this.venueService.createVenue(this.venue).subscribe({
      next: (newVenue) => {
        this.loading = false;
        this.router.navigate(['/venues', newVenue.venueId]);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Failed to create venue. Please try again.';
        console.error('Error creating venue', err);
      }
    });
  }
  
  validateForm(): boolean {
    if (!this.venue.name || this.venue.name.trim() === '') {
      this.errorMessage = 'Venue name is required';
      return false;
    }
    
    return true;
  }
  
  cancel(): void {
    this.router.navigate(['/venues']);
  }
}