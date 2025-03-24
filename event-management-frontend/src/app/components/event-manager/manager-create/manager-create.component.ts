import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventManagerService } from '../../../services/event-manager.service';

@Component({
  selector: 'app-manager-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './manager-create.component.html',
  styleUrl: './manager-create.component.css'
})
export class ManagerCreateComponent {
  managerForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private managerService: EventManagerService
  ) {
    this.managerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-]{10,}$/)]],
      organization: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.managerForm.invalid) {
      this.markFormGroupTouched(this.managerForm);
      return;
    }

    this.loading = true;
    this.managerService.createEventManager(this.managerForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/managers']);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to create event manager. Please try again.';
        console.error('Error creating manager:', err);
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
