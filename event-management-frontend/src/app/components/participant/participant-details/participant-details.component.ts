import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParticipantService } from '../../../services/participant.service';
import { EventService } from '../../../services/event.service';
import { Participant } from '../../../models/participant.model';
import { Event } from '../../../models/event.model';

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
  registeredEvents: Event[] = [];
  availableEvents: Event[] = [];
  loading = true;
  error: string | null = null;
  editMode = false;
  participantForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private participantService: ParticipantService,
    private eventService: EventService
  ) {
    this.participantForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-]{10,}$/)]],
      address: ['', Validators.required],
      emergencyContact: ['', Validators.required],
      dietaryRestrictions: [''],
      eventsRegistered: [[]]
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
        this.loadEvents();
      },
      error: (err) => {
        this.error = 'Failed to load participant details. Please try again later.';
        this.loading = false;
        console.error('Error fetching participant details:', err);
      }
    });
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (events) => {
        this.registeredEvents = events.filter(event => 
          this.participant?.eventsRegistered?.includes(event.id!)
        );
        this.availableEvents = events.filter(event => 
          !this.participant?.eventsRegistered?.includes(event.id!)
        );
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading events:', err);
        this.loading = false;
      }
    });
  }

  registerForEvent(eventId: number): void {
    if (!this.participant) return;
    
    this.loading = true;
    this.participantService.registerForEvent(this.participant.id!, eventId).subscribe({
      next: (updatedParticipant) => {
        this.participant = updatedParticipant;
        this.loadEvents();
      },
      error: (err) => {
        this.error = 'Failed to register for event. Please try again.';
        this.loading = false;
        console.error('Error registering for event:', err);
      }
    });
  }

  unregisterFromEvent(eventId: number): void {
    if (!this.participant) return;
    
    if (confirm('Are you sure you want to unregister from this event?')) {
      this.loading = true;
      this.participantService.unregisterFromEvent(this.participant.id!, eventId).subscribe({
        next: (updatedParticipant) => {
          this.participant = updatedParticipant;
          this.loadEvents();
        },
        error: (err) => {
          this.error = 'Failed to unregister from event. Please try again.';
          this.loading = false;
          console.error('Error unregistering from event:', err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.participantForm.invalid) {
      return;
    }

    this.loading = true;
    const updatedParticipant = {
      ...this.participantForm.value,
      id: this.participant?.id,
      eventsRegistered: this.participant?.eventsRegistered
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
