import { Routes } from '@angular/router';
import { EventListComponent } from './components/event/event-list/event-list.component';
import { EventDetailsComponent } from './components/event/event-details/event-details.component';
import { EventCreateComponent } from './components/event/event-create/event-create.component';
import { ActivityListComponent } from './components/activity/activity-list/activity-list.component';
import { ActivityDetailsComponent } from './components/activity/activity-details/activity-details.component';
import { ActivityCreateComponent } from './components/activity/activity-create/activity-create.component';
import { ManagerListComponent } from './components/event-manager/manager-list/manager-list.component';
import { ManagerCreateComponent } from './components/event-manager/manager-create/manager-create.component';
import { ParticipantListComponent } from './components/participant/participant-list/participant-list.component';
import { ParticipantDetailsComponent } from './components/participant/participant-details/participant-details.component';
import { ParticipantCreateComponent } from './components/participant/participant-create/participant-create.component';

export const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  
  // Event routes
  { path: 'events', component: EventListComponent },
  { path: 'events/create', component: EventCreateComponent },
  { path: 'events/:id', component: EventDetailsComponent },
  
  // Activity routes
  { path: 'activities', component: ActivityListComponent },
  { path: 'activities/create', component: ActivityCreateComponent },
  { path: 'activities/:id', component: ActivityDetailsComponent },
  
  // Event Manager routes
  { path: 'managers', component: ManagerListComponent },
  { path: 'managers/create', component: ManagerCreateComponent },
  
  // Participant routes
  { path: 'participants', component: ParticipantListComponent },
  { path: 'participants/create', component: ParticipantCreateComponent },
  { path: 'participants/:id', component: ParticipantDetailsComponent },
  
  // Fallback route
  { path: '**', redirectTo: '/events' }
];
