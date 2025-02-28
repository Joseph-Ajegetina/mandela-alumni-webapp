import { Injectable } from '@angular/core';
import { eventModel } from '../shared/event.model';
import { quickLinksData } from '../quicklinksData';

@Injectable({
  providedIn: 'root'
})
export class QuickLinkService {

  // constructor(){}

  getUserData():eventModel[]{
    return quickLinksData;
  }
}