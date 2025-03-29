import { Component, Input } from '@angular/core';
import { Card } from '../../interfaces/menu-item';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { TuiIcon } from '@taiga-ui/core';

@Component({
	selector: 'app-cards',
	imports: [NgFor, NgIf, NgClass, NgStyle, TuiIcon],
	templateUrl: './cards.component.html',
	styleUrl: './cards.component.less',
})
export class CardsComponent {
	@Input() card!: Card;

	navigateTo(link: string) {
		console.log('Navigating to:', link);
		window.location.href = link;
	}
}
