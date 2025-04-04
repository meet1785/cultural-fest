import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParticipantService } from '../../../services/participant.service';
import { Participant } from '../../../models/participant.model';
import { Activity } from '../../../models/activity.model';

@Component({
  selector: 'app-participant-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './participant-details.component.html',
  styleUrl: './participant-details.component.css'
})
export class ParticipantDetailsComponent implements OnInit {
  participantId!: number;
  participant: Participant | null = null;
  activities: Activity[] = [];
  loading = true;
  error: string | null = null;
  editMode = false;
  participantForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private participantService: ParticipantService
  ) {
    this.participantForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-]{10,}$/)]],
      collegeName: ['']
    });
  }

  ngOnInit(): void {
    this.participantId = +this.route.snapshot.paramMap.get('id')!;
    this.loadParticipantDetails();
  }

  loadParticipantDetails(): void {
    this.loading = true;
    this.participantService.getParticipant(this.participantId).subscribe({
      next: (participant) => {
        this.participant = participant;
        this.participantForm.patchValue(participant);
        this.loadActivities();
      },
      error: (err) => {
        this.error = 'Failed to load participant details. Please try again later.';
        this.loading = false;
        console.error('Error fetching participant details:', err);
      }
    });
  }

  loadActivities(): void {
    if (!this.participant) return;
    
    // Get activities this participant is registered for
    this.participantService.getActivitiesByParticipant(this.participant.participantId!).subscribe({
      next: (activities) => {
        this.activities = activities;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading activities:', err);
        this.loading = false;
      }
    });
  }

  registerForActivity(activityId: number): void {
    if (!this.participant) return;
    
    this.loading = true;
    this.participantService.registerForActivity(this.participant.participantId!, activityId).subscribe({
      next: () => {
        this.loadActivities(); // Reload the activities after registration
      },
      error: (err: any) => {
        this.error = 'Failed to register for activity. Please try again.';
        this.loading = false;
        console.error('Error registering for activity:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.participantForm.invalid) {
      return;
    }

    this.loading = true;
    const updatedParticipant = {
      ...this.participantForm.value,
      participantId: this.participant?.participantId
    };

    this.participantService.updateParticipant(updatedParticipant).subscribe({
      next: (participant) => {
        this.participant = participant;
        this.editMode = false;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to update participant details. Please try again.';
        this.loading = false;
        console.error('Error updating participant:', err);
      }
    });
  }
}
