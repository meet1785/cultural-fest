export interface Participant {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: string;
  dietaryRestrictions?: string;
  eventsRegistered?: number[];
  activitiesRegistered?: number[];
}