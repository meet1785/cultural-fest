import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivityService } from '../../../services/activity.service';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/event.model';

@Component({
  selector: 'app-activity-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './activity-create.component.html',
  styleUrl: './activity-create.component.css'
})
export class ActivityCreateComponent implements OnInit {
  activityForm: FormGroup;
  events: Event[] = [];
  preselectedEventId: number | null = null;
  loading = false;
  error: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private activityService: ActivityService,
    private eventService: EventService
  ) {
    this.activityForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      duration: [60, [Validators.required, Validators.min(1)]],
      capacity: [20, [Validators.required, Validators.min(1)]],
      equipmentNeeded: [''],
      location: ['', Validators.required],
      eventId: [null, Validators.required]
    });
  }
  
  ngOnInit(): void {
    // Check if there's an eventId in the query params (when adding activity from event details)
    this.route.queryParams.subscribe(params => {
      if (params['eventId']) {
        this.preselectedEventId = +params['eventId'];
        this.activityForm.get('eventId')?.setValue(this.preselectedEventId);
      }
    });
    
    this.loadEvents();
  }
  
  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (events) => {
        this.events = events;
      },
      error: (err) => {
        console.error('Error loading events:', err);
        this.error = 'Failed to load events. Some form options may be unavailable.';
      }
    });
  }
  
  onSubmit(): void {
    if (this.activityForm.invalid) {
      this.markFormGroupTouched(this.activityForm);
      return;
    }
    
    this.loading = true;
    const activityData = this.activityForm.value;
    
    this.activityService.createActivity(activityData).subscribe({
      next: (createdActivity) => {
        this.loading = false;
        if (this.preselectedEventId) {
          // If created from event details, go back to event
          this.router.navigate(['/events', this.preselectedEventId]);
        } else {
          // Otherwise go to activity details
          this.router.navigate(['/activities', createdActivity.id]);
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to create the activity. Please try again.';
        console.error('Error creating activity:', err);
      }
    });
  }
  
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as FormGroup).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
