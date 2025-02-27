import { Injectable } from '@angular/core';
import { quickLinkModel } from '../shared/data.model';
import { quickLinksData } from '../quicklinkData';

@Injectable({
  providedIn: 'root'
})
export class QuickLinkService {
  
  // constructor(){}
  
  getUserData():quickLinkModel[]{
    return quickLinksData;
  }
}
