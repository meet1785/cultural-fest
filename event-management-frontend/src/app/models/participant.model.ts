export interface Participant {
  participantId?: number;
  name: string;
  email: string;
  phone?: string;
  collegeName?: string;
  id?: number; // Alias for participantId
}