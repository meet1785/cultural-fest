import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ParticipantService } from '../../../services/participant.service';
import { Participant } from '../../../models/participant.model';

@Component({
  selector: 'app-participant-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './participant-list.component.html',
  styleUrl: './participant-list.component.css'
})
export class ParticipantListComponent implements OnInit {
  participants: Participant[] = [];
  loading = true;
  error: string | null = null;

  constructor(private participantService: ParticipantService) { }

  ngOnInit(): void {
    this.loadParticipants();
  }

  loadParticipants(): void {
    this.participantService.getParticipants().subscribe({
      next: (participants) => {
        this.participants = participants;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load participants. Please try again later.';
        this.loading = false;
        console.error('Error loading participants:', err);
      }
    });
  }

  deleteParticipant(id: number): void {
    if (confirm('Are you sure you want to delete this participant? This action cannot be undone.')) {
      this.participantService.deleteParticipant(id).subscribe({
        next: () => {
          this.participants = this.participants.filter(participant => participant.participantId !== id);
        },
        error: (err) => {
          this.error = 'Failed to delete the participant. Please try again.';
          console.error('Error deleting participant:', err);
        }
      });
    }
  }
}
