import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { AccountNavigationComponent } from "./account-navigation/account-navigation.component";
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { TuiPortals } from '@taiga-ui/cdk';
import { TUI_DARK_MODE, TuiButton, TuiDropdown, TuiIcon} from '@taiga-ui/core';
import { TuiNavigation } from '@taiga-ui/layout';


@Component({
  selector: 'app-account-layout',
  imports: [AccountNavigationComponent, CommonModule, RouterOutlet, TuiDropdown, TuiNavigation,
      TuiButton, TuiIcon,],
  templateUrl: './account-layout.component.html',
  styleUrl: './account-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [],
})
export class AccountLayoutComponent extends TuiPortals {
  protected darkMode = inject(TUI_DARK_MODE);
  protected router = inject(Router);
  protected open = signal(false);
  theme = computed(() => (this.darkMode() ? 'dark' : 'light'));
  protected handleToggle(): void {
		this.open.update((e) => !e);
	}

  goBack(): void {
    this.router.navigate(['/dashboard'])
  }
}
