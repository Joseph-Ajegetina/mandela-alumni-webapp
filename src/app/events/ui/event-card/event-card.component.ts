import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiPush } from '@taiga-ui/kit';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { Event } from '@mandela-alumni-webapp/api-interfaces';
import { TuiCell } from '@taiga-ui/layout';

@Component({
	selector: 'app-event-card',
	imports: [CommonModule, TuiPush, TuiIcon, TuiCell, TuiButton],
	templateUrl: './event-card.component.html',
	styleUrl: './event-card.component.less',
})
export class EventCardComponent {
	event = input<Event | null>(null);
}
