import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	imports: [RouterModule],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.less',
})
export class AppComponent {
	title = 'mandela-alumni-webapp';
}
