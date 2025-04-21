import { Component, ChangeDetectionStrategy,inject } from '@angular/core';
import { TuiIcon, TuiTitle, TuiAppearance, TuiAlertService, TuiButton} from '@taiga-ui/core';
import {TuiBlock, TuiButtonGroup} from '@taiga-ui/kit';
import type {TuiConfirmData} from '@taiga-ui/kit';
import {TUI_CONFIRM} from '@taiga-ui/kit';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiResponsiveDialogService} from '@taiga-ui/addon-mobile';
import {switchMap} from 'rxjs';

@Component({
  selector: 'app-security-access',
  imports: [ 
    TuiIcon,
    TuiBlock,
    ReactiveFormsModule,
    TuiTitle,
    TuiButtonGroup,
    TuiAppearance,
  ],
  templateUrl: './security-access.component.html',
  styleUrl: './security-access.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecurityAccessComponent {
  protected readonly testForm = new FormGroup({
    testValue3: new FormControl(),
  });
  private readonly dialogs = inject(TuiResponsiveDialogService);
  private readonly alerts = inject(TuiAlertService);

  protected onClick(): void {
    const data: TuiConfirmData = {
        content:
            'Are you sure you want to delete your account. This action cannot be undone.',
        yes: 'Yes, I\'m sure',
        no: 'No',
    };

    this.dialogs
    
        .open<boolean>(TUI_CONFIRM, {
            label: 'Delete Your Account?',
            appearance: 'negative',
            size: 's',
            data,
        })
        .pipe(switchMap((response) => this.alerts.open(String(response))))
        .subscribe();
}
}