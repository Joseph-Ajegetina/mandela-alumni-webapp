import { Injectable } from '@angular/core';
import { eventPageModel } from '../shared/event-page.model';
import { upcomingEventData } from '../upcomingeventData';

@Injectable({
  providedIn: 'root'
})
export class EventPageService {

  // constructor() { }

  getUserData(): eventPageModel[] {
    return upcomingEventData;
  }
  
}