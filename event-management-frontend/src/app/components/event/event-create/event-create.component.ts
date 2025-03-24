import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../../services/event.service';
import { EventManagerService } from '../../../services/event-manager.service';
import { EventManager } from '../../../models/event-manager.model';

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.css'
})
export class EventCreateComponent {
  eventForm: FormGroup;
  eventManagers: EventManager[] = [];
  loading = false;
  error: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eventService: EventService,
    private eventManagerService: EventManagerService
  ) {
    this.eventForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      date: ['', Validators.required],
      location: ['', Validators.required],
      maxParticipants: [50, [Validators.required, Validators.min(1)]],
      organizerId: [null, Validators.required]
    });
    
    this.loadEventManagers();
  }
  
  loadEventManagers(): void {
    this.eventManagerService.getEventManagers().subscribe({
      next: (managers) => {
        this.eventManagers = managers;
      },
      error: (err) => {
        console.error('Error loading event managers:', err);
        this.error = 'Failed to load event managers. Some form options may be unavailable.';
      }
    });
  }
  
  onSubmit(): void {
    if (this.eventForm.invalid) {
      this.markFormGroupTouched(this.eventForm);
      return;
    }
    
    this.loading = true;
    const eventData = {
      ...this.eventForm.value,
      date: new Date(this.eventForm.value.date)
    };
    
    this.eventService.createEvent(eventData).subscribe({
      next: (createdEvent) => {
        this.loading = false;
        this.router.navigate(['/events', createdEvent.id]);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to create the event. Please try again.';
        console.error('Error creating event:', err);
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
