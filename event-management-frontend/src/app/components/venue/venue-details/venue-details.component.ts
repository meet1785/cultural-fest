import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Venue } from '../../../models/venue.model';
import { VenueService } from '../../../services/venue.service';
import { Activity } from '../../../models/activity.model';
import { ActivityService } from '../../../services/activity.service';

@Component({
  selector: 'app-venue-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './venue-details.component.html',
  styleUrls: ['./venue-details.component.css']
})
export class VenueDetailsComponent implements OnInit {
  venue: Venue | null = null;
  activities: Activity[] = [];
  loading = true;
  editMode = false;
  errorMessage = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private venueService: VenueService,
    private activityService: ActivityService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadVenueDetails(id);
    } else {
      this.errorMessage = 'Invalid venue ID';
      this.loading = false;
    }
  }

  loadVenueDetails(id: number): void {
    this.loading = true;
    this.venueService.getVenue(id).subscribe({
      next: (data) => {
        this.venue = data;
        this.loadActivities(id);
      },
      error: (err) => {
        this.errorMessage = 'Failed to load venue details';
        this.loading = false;
        console.error('Error loading venue', err);
      }
    });
  }

  loadActivities(venueId: number): void {
    this.activityService.getActivitiesByVenue(venueId).subscribe({
      next: (data) => {
        this.activities = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading activities', err);
        this.loading = false;
      }
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  saveChanges(): void {
    if (!this.venue) return;
    
    this.loading = true;
    this.venueService.updateVenue(this.venue.venueId!, this.venue).subscribe({
      next: (updatedVenue) => {
        this.venue = updatedVenue;
        this.editMode = false;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to update venue';
        this.loading = false;
        console.error('Error updating venue', err);
      }
    });
  }

  deleteVenue(): void {
    if (!this.venue) return;
    
    if (confirm('Are you sure you want to delete this venue? This will affect all associated activities.')) {
      this.venueService.deleteVenue(this.venue.venueId!).subscribe({
        next: () => {
          this.router.navigate(['/venues']);
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete venue';
          console.error('Error deleting venue', err);
        }
      });
    }
  }

  goToActivityDetails(activityId: number): void {
    this.router.navigate(['/activities', activityId]);
  }

  goBack(): void {
    this.router.navigate(['/venues']);
  }
}