import { Component, ChangeDetectionStrategy} from '@angular/core';
import type { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { UserSidebarComponent } from "../user-sidebar/user-sidebar.component";
import { TuiPlatform } from '@taiga-ui/cdk';
import { TuiSwitch } from '@taiga-ui/kit';
import { TuiButton, TuiDropdown, TuiSizeS } from '@taiga-ui/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-preferences',
	imports: [
		CommonModule, 
		// UserSidebarComponent, 
		TuiPlatform, 
		TuiSwitch,
		TuiDropdown,
		FormsModule, 
		ReactiveFormsModule,
		TuiButton,
	],
	templateUrl: './preferences.component.html',
	styleUrl: './preferences.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreferencesComponent implements OnInit {
	protected readonly platforms: ReadonlyArray<'android' | 'ios' | 'web'> = [
		'web',
		'web',
		'android',
		'ios',
	];
	protected readonly topPlatform = this.platforms[0];
	protected readonly invalidTrue = new FormControl(true, () => ({invalid: true}));
    protected readonly invalidFalse = new FormControl(false, () => ({invalid: true}));
 
    public ngOnInit(): void {
        this.invalidTrue.markAsTouched();
        this.invalidFalse.markAsTouched();
    }

	protected getSize(first: boolean): TuiSizeS {
        return first ? 'm' : 's';
    }
}
