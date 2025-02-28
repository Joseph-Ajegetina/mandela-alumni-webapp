import { Injectable } from '@angular/core';
import { eventModel } from '../shared/event.model';
import { upcomingEventData } from '../upcomingeventData';

@Injectable({
  providedIn: 'root'
})
export class UpcomingEventService {

  // constructor() { }

  getUserData():eventModel[]{
      return upcomingEventData;
    }
}