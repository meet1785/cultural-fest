export interface Activity {
  activityId?: number;
  name: string;
  description?: string;
  eventId?: number;
  venueId?: number;
  id?: number; // Alias for activityId
}
