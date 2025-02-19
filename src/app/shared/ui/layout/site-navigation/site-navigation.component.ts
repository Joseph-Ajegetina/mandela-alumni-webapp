import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'src/app/shared/interfaces/menu-item';
import { RouterModule } from '@angular/router';
import { TuiButton, TuiLink } from '@taiga-ui/core';

@Component({
	selector: 'app-site-navigation',
	imports: [CommonModule, RouterModule, TuiButton, TuiLink],
	templateUrl: './site-navigation.component.html',
	styleUrl: './site-navigation.component.less',
})
export class SiteNavigationComponent {
	protected readonly menuItems = signal<MenuItem[]>([
		{
			icon: '@tui.home',
			label: 'Dashboard',
			route: 'dashboard',
		},
		{
			icon: '@tui.heart',
			label: 'Favorites',
			route: 'favorites',
		},
	]);
}
