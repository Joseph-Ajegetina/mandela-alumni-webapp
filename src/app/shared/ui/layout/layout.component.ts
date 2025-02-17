import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiNavigation } from '@taiga-ui/layout';
import { WA_LOCAL_STORAGE, WA_WINDOW } from '@ng-web-apis/common';
import {
	TuiButton,
	TuiDataList,
	TuiOptGroup,
	TuiDropdownService,
	TuiDropdown,
	TuiTextfield,
	TuiAppearance,
	TuiLink,
	TUI_DARK_MODE_KEY,
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
import { tuiAsPortal, TuiItem, TuiPortals, TuiThemeColorService } from '@taiga-ui/cdk';
import { ICON } from '../icon';
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
	protected key = inject(TUI_DARK_MODE_KEY);
	protected storage = inject(WA_LOCAL_STORAGE);
	protected media = inject(WA_WINDOW).matchMedia('(prefers-color-scheme: dark)');
	protected darkMode = inject(TUI_DARK_MODE);

	private readonly themeService = inject(TuiThemeColorService);

	isDarkMode = computed(() => (this.darkMode() ? 'dark' : 'light'));

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
