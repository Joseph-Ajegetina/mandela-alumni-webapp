import { Injectable } from '@angular/core';
import { cards, cardsModel } from './contribution.data';

@Injectable({
  providedIn: 'root'
})
export class ContributionService {

  constructor() { }

  fetchContributionData():cardsModel[]{
    return cards;
  }
}
