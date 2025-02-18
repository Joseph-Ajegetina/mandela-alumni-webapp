import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiNavigation } from '@taiga-ui/layout';
import { WA_LOCAL_STORAGE } from '@ng-web-apis/common';
import {
	TuiButton,
	TuiDataList,
	TuiOptGroup,
	TuiDropdownService,
	TuiDropdown,
	TuiTextfield,
	TuiAppearance,
	TuiLink,
	TUI_DARK_MODE,
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
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { MenuItem } from '../../interfaces/menu-item';

@Component({
	selector: 'app-layout',
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
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
	protected darkMode = inject(TUI_DARK_MODE);

	isDarkMode = computed(() => (this.darkMode() ? 'dark' : 'light'));
	protected openDrawer = false;

	protected readonly menuItems = signal<MenuItem[]>([
		{
			icon: '@tui.layout',
			label: 'Dashboard',
			route: 'dashboard',
		},
	]);
}
