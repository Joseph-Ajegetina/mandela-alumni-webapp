import { TuiAlertService, TuiRoot } from '@taiga-ui/core';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	imports: [RouterModule, TuiRoot],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.less',
})
export class AppComponent {
	title = 'mandela-alumni-webapp';

	private readonly alerts = inject(TuiAlertService);

	protected showNotification(): void {
		this.alerts.open('Basic <strong>HTML</strong>', { label: 'With a heading!' }).subscribe();
	}
}
