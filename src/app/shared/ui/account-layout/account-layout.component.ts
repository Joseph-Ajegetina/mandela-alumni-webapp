import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AccountNavigationComponent } from './account-navigation/account-navigation.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TUI_DARK_MODE, TuiButton, TuiDropdown, TuiIcon, TuiLink } from '@taiga-ui/core';
import { TuiNavigation } from '@taiga-ui/layout';

@Component({
	selector: 'app-account-layout',
	imports: [
		AccountNavigationComponent,
		CommonModule,
		RouterOutlet,
		TuiDropdown,
		TuiNavigation,
		TuiButton,
		TuiIcon,
		RouterLink,
	],
	templateUrl: './account-layout.component.html',
	styleUrl: './account-layout.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [],
})
export class AccountLayoutComponent {
	protected darkMode = inject(TUI_DARK_MODE);
	protected open = signal(false);
	theme = computed(() => (this.darkMode() ? 'dark' : 'light'));
	protected handleToggle(): void {
		this.open.update((e) => !e);
	}
}
