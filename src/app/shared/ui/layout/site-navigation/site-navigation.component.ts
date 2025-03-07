import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'src/app/shared/interfaces/menu-item';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { TuiButton, TuiLink } from '@taiga-ui/core';
import { TuiNavigation } from '@taiga-ui/layout';
import { TuiChevron } from '@taiga-ui/kit';

@Component({
	selector: 'app-site-navigation',
	imports: [
		CommonModule,
		RouterModule,
		TuiButton,
		TuiLink,
		TuiNavigation,
		TuiChevron,
		RouterLink,
		RouterLinkActive,
	],
	templateUrl: './site-navigation.component.html',
	styleUrl: './site-navigation.component.less',
})
export class SiteNavigationComponent {
	theme = input('light');
	onLogout = output();
	protected open = false;
	logingOut = false;
	protected readonly routes: any = { home: 'dashboard', directory: 'directory' };

	logout() {
		this.logingOut = true;
		this.onLogout.emit();
	}
}
