export interface Event {
  id?: number;
  name: string;
  description: string;
  date: Date;
  location: string;
  maxParticipants: number;
  organizerId?: number;
  activities?: number[];
  participants?: number[];
}
