import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TuiPortals } from '@taiga-ui/cdk';
import { TuiButton } from '@taiga-ui/core';
import { TuiNavigation } from '@taiga-ui/layout';

@Component({
	selector: 'app-account-navigation',
	imports: [TuiNavigation, TuiButton, CommonModule, RouterLink],
	templateUrl: './account-navigation.component.html',
	styleUrl: './account-navigation.component.less',
})
export class AccountNavigationComponent extends TuiPortals {
	theme = input('light');
	protected expanded = signal(false);
	protected readonly routes: any = {
		profile: 'profile',
		detail: 'detail',
		security: 'security',
		preference: 'preference',
	};
	protected open = signal(false);

	protected handleToggle(): void {
		this.open.update((e) => !e);
	}
}
