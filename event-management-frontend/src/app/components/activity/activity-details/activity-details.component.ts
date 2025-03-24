import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ActivityService } from '../../../services/activity.service';
import { EventService } from '../../../services/event.service';
import { Activity } from '../../../models/activity.model';
import { Event } from '../../../models/event.model';

@Component({
  selector: 'app-activity-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './activity-details.component.html',
  styleUrl: './activity-details.component.css'
})
export class ActivityDetailsComponent implements OnInit {
  activityId!: number;
  activity: Activity | null = null;
  event: Event | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.activityId = +this.route.snapshot.paramMap.get('id')!;
    this.loadActivityDetails();
  }

  loadActivityDetails(): void {
    this.loading = true;
    this.activityService.getActivity(this.activityId).subscribe({
      next: (activity) => {
        this.activity = activity;
        if (activity.eventId) {
          this.loadEventDetails(activity.eventId);
        } else {
          this.loading = false;
        }
      },
      error: (err) => {
        this.error = 'Failed to load activity details. Please try again later.';
        this.loading = false;
        console.error('Error fetching activity details:', err);
      }
    });
  }

  loadEventDetails(eventId: number): void {
    this.eventService.getEvent(eventId).subscribe({
      next: (event) => {
        this.event = event;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching event details:', err);
        this.loading = false;
      }
    });
  }
}
