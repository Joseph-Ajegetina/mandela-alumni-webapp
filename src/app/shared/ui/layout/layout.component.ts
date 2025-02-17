import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiNavigation } from '@taiga-ui/layout';
import {
	TuiButton,
	TuiDataList,
	TuiOptGroup,
	TuiDropdownService,
	TuiDropdown,
	TuiTextfield,
	TuiAppearance,
	TuiLink,
} from '@taiga-ui/core';
import {
	TuiAvatar,
	TuiBadge,
	TuiBreadcrumbs,
	TuiChevron,
	TuiDataListDropdownManager,
	TuiFade,
	TuiSwitch,
	TuiTabs,
} from '@taiga-ui/kit';
import { tuiAsPortal, TuiItem, TuiPortals } from '@taiga-ui/cdk';
import { ICON } from '../icon';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from '../../interfaces/menu-item';

@Component({
	selector: 'app-layout',
	imports: [
		CommonModule,
		FormsModule,
		RouterLink,
		RouterLinkActive,
		TuiNavigation,
		TuiButton,
		TuiDataList,
		TuiDataListDropdownManager,
		TuiOptGroup,
		TuiSwitch,
		TuiChevron,
		TuiFade,
		TuiBadge,
		TuiAvatar,
		TuiDropdown,
		TuiBreadcrumbs,
		TuiTextfield,
		TuiItem,
		TuiAppearance,
		TuiLink,
		TuiTabs,
	],
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TuiDropdownService, tuiAsPortal(TuiDropdownService)],
})
export class LayoutComponent extends TuiPortals {
	protected expanded = signal(false);
	protected open = false;
	protected switch = false;
	protected readonly routes: any = {};

	protected readonly menuItems = signal<MenuItem[]>([
		{
			icon: '@tui.home',
			label: 'Dashboard',
			route: 'dashboard',
		},
	]);

	protected breadcrumbs = ['Home', 'Angular', 'repositories', 'taiga ui'];

	protected handleToggle(): void {
		this.expanded.update((value) => !value);
	}
}
