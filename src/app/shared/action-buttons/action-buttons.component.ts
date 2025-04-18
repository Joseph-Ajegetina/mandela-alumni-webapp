import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-action-buttons',
  imports: [TuiIcon, NgFor, NgIf,TuiIcon],
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.less'
})
export class ActionButtonsComponent {
  @Input() buttons: {
    label: string;
    icon?: string;      
    appearance?: string;   
    action: string;
  }[] = [];

  @Output() buttonClick = new EventEmitter<string>();

  onClick(action: string): void {
    this.buttonClick.emit(action);
  }
}
