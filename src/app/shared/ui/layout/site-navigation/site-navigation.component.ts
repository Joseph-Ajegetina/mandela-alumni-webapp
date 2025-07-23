import { Component, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'src/app/shared/interfaces/menu-item';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { TuiButton, TuiLink } from '@taiga-ui/core';
import { TuiNavigation } from '@taiga-ui/layout';
import { TuiChevron } from '@taiga-ui/kit';
import { UserStore } from '@mandela-alumni-webapp/core-state';

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
	providers: [UserStore],
})
export class SiteNavigationComponent {
	theme = input('light');
	onLogout = output();
	protected open = false;
	protected toggleEvents = signal(false);
	readonly userStore = inject(UserStore);
	readonly currentUser = this.userStore.currentUser;
	readonly isAdmin = this.userStore.isAdmin;
	logingOut = false;
	protected readonly routes: any = {
		home: 'dashboard',
		directory: 'directory',
		approval: 'approvals',
		users: 'users',
		payment: 'payment',
		events: 'events',
		createEvent: 'new-event',
	};

	logout() {
		this.logingOut = true;
		this.onLogout.emit();
	}
}
