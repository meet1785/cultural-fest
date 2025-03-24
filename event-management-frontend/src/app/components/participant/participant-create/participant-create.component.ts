import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParticipantService } from '../../../services/participant.service';

@Component({
  selector: 'app-participant-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './participant-create.component.html',
  styleUrl: './participant-create.component.css'
})
export class ParticipantCreateComponent {
  participantForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private participantService: ParticipantService
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

  onSubmit(): void {
    if (this.participantForm.invalid) {
      this.markFormGroupTouched(this.participantForm);
      return;
    }

    this.loading = true;
    this.participantService.createParticipant(this.participantForm.value).subscribe({
      next: (createdParticipant) => {
        this.loading = false;
        this.router.navigate(['/participants', createdParticipant.id]);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to create participant. Please try again.';
        console.error('Error creating participant:', err);
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
