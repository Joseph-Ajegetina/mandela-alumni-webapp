import { TUI_DARK_MODE, TUI_DARK_MODE_KEY, TuiRoot } from '@taiga-ui/core';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WA_LOCAL_STORAGE, WA_WINDOW } from '@ng-web-apis/common';
import { QuicklinksComponent } from './features/quicklinks/quicklinks.component';

@Component({
	imports: [RouterModule, TuiRoot,QuicklinksComponent],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.less',
})
export class AppComponent implements OnInit {
	title = 'mandela-alumni-webapp';

	protected key = inject(TUI_DARK_MODE_KEY);
	protected storage = inject(WA_LOCAL_STORAGE);
	protected media = inject(WA_WINDOW).matchMedia('(prefers-color-scheme: light)');

	protected darkMode = inject(TUI_DARK_MODE);

	ngOnInit(): void {
		this.darkMode.set(false);
	}
}
