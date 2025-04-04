export interface Event {
  eventId?: number;
  name: string;
  date: Date;
  managerId?: number;
  id?: number; // Alias for eventId
}
