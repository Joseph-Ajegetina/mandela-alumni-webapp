import { Injectable } from '@angular/core';
import { quickLinkModel } from '../shared/data.model';
import { upcomingEventData } from '../upcomingEventData';

@Injectable({
  providedIn: 'root'
})
export class UpcomingeventService {

  // constructor() { }

  getUserData():quickLinkModel[]{
      return upcomingEventData;
    }
}
