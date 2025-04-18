import { Component } from '@angular/core';
import { TuiAvatar } from '@taiga-ui/kit';
import { ActionButtonsComponent } from "../../../shared/action-buttons/action-buttons.component";

@Component({
  selector: 'app-profile-page',
  imports: [TuiAvatar,  ActionButtonsComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.less'
})
export class ProfilePageComponent {
  profileActions = [
    { label: 'Edit', icon: '@tui.pencil-line', appearance: 'accent', action: 'edit' }
  ];

  handleAction(action: string) {
    switch (action) {
      case 'edit':
       console.log('Edit Button preesd')
        break;
      case 'save':
        // Save logic
        break;
      case 'cancel':
        // Cancel logic
        break;
    }
  }
  
}
