import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventManagerService } from '../../../services/event-manager.service';
import { EventManager } from '../../../models/event-manager.model';

@Component({
  selector: 'app-manager-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './manager-list.component.html',
  styleUrl: './manager-list.component.css'
})
export class ManagerListComponent implements OnInit {
  // Fix: Rename 'managers' to 'eventManagers' to match template
  eventManagers: EventManager[] = [];
  loading = true;
  error: string | null = null;

  constructor(private managerService: EventManagerService) { }

  ngOnInit(): void {
    this.loadManagers();
  }

  loadManagers(): void {
    this.loading = true;
    this.managerService.getEventManagers().subscribe({
      next: (managers) => {
        // Fix: Assign to eventManagers property
        this.eventManagers = managers;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load event managers. Please try again later.';
        this.loading = false;
        console.error('Error fetching event managers:', err);
      }
    });
  }

  deleteManager(id: number): void {
    if (confirm('Are you sure you want to delete this event manager?')) {
      this.managerService.deleteEventManager(id).subscribe({
        next: () => {
          // Fix: Filter from eventManagers
          this.eventManagers = this.eventManagers.filter(manager => manager.managerId !== id);
        },
        error: (err) => {
          this.error = 'Failed to delete the event manager. Please try again.';
          console.error('Error deleting event manager:', err);
        }
      });
    }
  }
}
