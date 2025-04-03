import { Component, Input } from '@angular/core';
import { TuiIcon } from '@taiga-ui/core';
import { CommonModule } from '@angular/common';
import { Event } from '@mandela-alumni-webapp/api-interfaces';

@Component({
	selector: 'app-cards',
	imports: [CommonModule, TuiIcon],
	templateUrl: './cards.component.html',
	styleUrl: './cards.component.less',
})
export class CardsComponent {
	@Input() card!: Event;

	navigateTo(link: string) {
		console.log('Navigating to:', link);
		window.location.href = link;
	}
}
