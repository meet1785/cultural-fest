export interface EventManager {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  role: string;
  managedEvents?: number[];
}
