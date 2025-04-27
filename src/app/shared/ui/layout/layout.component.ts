import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiNavigation } from '@taiga-ui/layout';
import { SiteNavigationComponent } from './site-navigation/site-navigation.component';
import {
	TuiButton,
	TuiDataList,
	TuiDropdown,
	TUI_DARK_MODE,
	TuiFallbackSrcPipe,
	TuiIcon,
	TuiAutoColorPipe,
	TuiLink,
} from '@taiga-ui/core';
import { TuiAvatar, TuiAvatarLabeled } from '@taiga-ui/kit';
import { TuiPortals } from '@taiga-ui/cdk';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthState } from '@mandela-alumni-webapp/core-state';

@Component({
	selector: 'app-layout',
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		TuiNavigation,
		TuiButton,
		TuiAvatar,
		TuiAvatarLabeled,
		TuiFallbackSrcPipe,
		TuiDropdown,
		TuiDataList,
		TuiIcon,
		TuiAutoColorPipe,
		SiteNavigationComponent,
		TuiDataList
	],
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [],
})
export class LayoutComponent {
	protected darkMode = inject(TUI_DARK_MODE);
	protected authState = inject(AuthState);
	protected router = inject(Router);

	protected open = signal(false);

	theme = computed(() => (this.darkMode() ? 'dark' : 'light'));

	protected handleToggle(): void {
		this.open.update((e) => !e);
	}

	logout(): void {
		this.authState.logout(true);
	}
}
