import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiNavigation } from '@taiga-ui/layout';
import { SiteNavigationComponent } from './site-navigation/site-navigation.component';
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
	tuiSlideInLeft,
} from '@taiga-ui/core';
import {
	TuiAvatar,
	TuiBadge,
	TuiBreadcrumbs,
	TuiChevron,
	TuiDataListDropdownManager,
	TuiDrawer,
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
		TuiAvatar,
		SiteNavigationComponent,
	],
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [],
})
export class LayoutComponent extends TuiPortals {
	protected darkMode = inject(TUI_DARK_MODE);
	protected open = signal(false);

	isDarkMode = computed(() => (this.darkMode() ? 'dark' : 'light'));

	protected handleToggle(): void {
		this.open.update((e) => !e);
	}
}
