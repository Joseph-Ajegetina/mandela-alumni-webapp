import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiPlatform } from '@taiga-ui/cdk';
import { TuiButton, TuiDropdown, TuiSizeS } from '@taiga-ui/core';
import { TuiSwitch } from '@taiga-ui/kit';

@Component({
	selector: 'app-preference-page',
	imports: [
		CommonModule,
		TuiPlatform,
		TuiSwitch,
		TuiDropdown,
		FormsModule,
		ReactiveFormsModule,
		TuiButton,
	],
	templateUrl: './preference-page.component.html',
	styleUrl: './preference-page.component.css',
})
export class PreferencePageComponent {
	protected readonly platforms: ReadonlyArray<'android' | 'ios' | 'web'> = [
		'web',
		'web',
		'android',
		'ios',
	];
	protected readonly topPlatform = this.platforms[0];
	protected readonly invalidTrue = new FormControl(true, () => ({ invalid: true }));
	protected readonly invalidFalse = new FormControl(false, () => ({ invalid: true }));

	public ngOnInit(): void {
		this.invalidTrue.markAsTouched();
		this.invalidFalse.markAsTouched();
	}

	protected getSize(first: boolean): TuiSizeS {
		return first ? 'm' : 's';
	}
}
