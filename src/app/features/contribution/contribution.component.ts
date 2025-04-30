import { ContributionService } from './contribution.service';
import { Component, OnInit } from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TuiHint, TuiTextfield} from '@taiga-ui/core';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';
import { TuiDropdown} from '@taiga-ui/core';
import { TuiDataListWrapper} from '@taiga-ui/kit';
import {TuiMultiSelectModule} from '@taiga-ui/legacy';
import { cardsModel } from './contribution.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contribution',
  standalone: true,
  imports: [
    FormsModule,
    TuiHint,
    TuiInputModule,
    TuiTextfield,
    TuiTextfieldControllerModule,
    TuiDataListWrapper,
    TuiDropdown,
    TuiMultiSelectModule,
    CommonModule,
  ],
  templateUrl: './contribution.component.html',
  styleUrl: './contribution.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContributionComponent implements OnInit {
  protected value = '';
  cards:cardsModel[]=[];
  notification = 30;

  constructor(private contributionService:ContributionService){}

  ngOnInit(): void {
      this.cards= this.contributionService.fetchContributionData();
  }
}
