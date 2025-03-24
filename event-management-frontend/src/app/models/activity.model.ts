export interface Activity {
  id?: number;
  name: string;
  description: string;
  duration: number; // in minutes
  capacity: number;
  equipmentNeeded: string;
  location: string;
  eventId?: number;
}
