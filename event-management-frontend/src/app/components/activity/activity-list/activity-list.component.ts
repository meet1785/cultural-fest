import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivityService } from '../../../services/activity.service';
import { Activity } from '../../../models/activity.model';

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './activity-list.component.html',
  styleUrl: './activity-list.component.css'
})
export class ActivityListComponent implements OnInit {
  activities: Activity[] = [];
  loading = true;
  error: string | null = null;

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(): void {
    this.loading = true;
    this.activityService.getActivities().subscribe({
      next: (activities) => {
        this.activities = activities;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load activities. Please try again later.';
        this.loading = false;
        console.error('Error fetching activities:', err);
      }
    });
  }

  deleteActivity(id: number): void {
    if (confirm('Are you sure you want to delete this activity?')) {
      this.activityService.deleteActivity(id).subscribe({
        next: () => {
          this.activities = this.activities.filter(activity => activity.id !== id);
        },
        error: (err) => {
          this.error = 'Failed to delete the activity. Please try again.';
          console.error('Error deleting activity:', err);
        }
      });
    }
  }
}
