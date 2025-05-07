import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiPlatform } from '@taiga-ui/cdk';
import { TuiButton, TuiDropdown, TuiSizeS, TuiAlertService, TuiIcon } from '@taiga-ui/core';
import { TuiSwitch, TuiConfirmData } from '@taiga-ui/kit'; 
import { switchMap } from 'rxjs';
import { TuiResponsiveDialogService } from '@taiga-ui/addon-mobile';
import {TUI_CONFIRM} from '@taiga-ui/kit';


@Component({
  selector: 'app-security-access',
  imports: [ 
    CommonModule,
		TuiPlatform,
		TuiSwitch,
		TuiDropdown,
		FormsModule,
		ReactiveFormsModule,
		TuiButton,
    TuiIcon
  ],
  templateUrl: './security-access.component.html',
  styleUrl: './security-access.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SecurityAccessComponent {
  protected readonly platforms: ReadonlyArray<'android' | 'ios' | 'web'> = [
		'web',
		'web',
		'android',
		'ios',
	];
	
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

	protected getSize(first: boolean): TuiSizeS {
		return first ? 'm' : 's';
  }
}