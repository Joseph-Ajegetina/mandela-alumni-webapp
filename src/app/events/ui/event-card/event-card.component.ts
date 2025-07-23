import { Component, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiPush } from '@taiga-ui/kit';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { Event } from '@mandela-alumni-webapp/api-interfaces';
import { TuiCell } from '@taiga-ui/layout';
import { RouterLink } from '@angular/router';
import { UserStore } from '@mandela-alumni-webapp/core-state';

@Component({
	selector: 'app-event-card',
	imports: [CommonModule, TuiPush, TuiIcon, TuiCell, TuiButton, RouterLink],
	templateUrl: './event-card.component.html',
	styleUrl: './event-card.component.less',
})
export class EventCardComponent {
	event = input<Event | null>(null);
	readonly userStore = inject(UserStore);

	onRegister(): void {
		// Handle registration logic for non-admin users
		console.log('Registering for event:', this.event()?.id);
		// You can add registration logic here, such as opening a modal or making an API call
	}
}
