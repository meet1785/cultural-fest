import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { ActivityService } from '../../../services/activity.service';
import { Event } from '../../../models/event.model';
import { Activity } from '../../../models/activity.model';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit {
  eventId!: number;
  event: Event | null = null;
  activities: Activity[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private activityService: ActivityService
  ) { }

  ngOnInit(): void {
    this.eventId = +this.route.snapshot.paramMap.get('id')!;
    this.loadEventDetails();
  }

  loadEventDetails(): void {
    this.loading = true;
    this.eventService.getEvent(this.eventId).subscribe({
      next: (event) => {
        this.event = event;
        this.loadActivities();
      },
      error: (err) => {
        this.error = 'Failed to load event details. Please try again later.';
        this.loading = false;
        console.error('Error fetching event details:', err);
      }
    });
  }

  loadActivities(): void {
    this.activityService.getActivitiesByEventId(this.eventId).subscribe({
      next: (activities: Activity[]) => {
        this.activities = activities;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error fetching activities:', err);
        this.loading = false;
      }
    });
  }
}
