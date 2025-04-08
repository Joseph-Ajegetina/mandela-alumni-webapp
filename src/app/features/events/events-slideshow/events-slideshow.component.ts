import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiCarousel, TuiPagination } from '@taiga-ui/kit';
import { Event } from '@mandela-alumni-webapp/api-interfaces';
import { TuiIcon } from '@taiga-ui/core';

@Component({
	selector: 'app-events-slideshow',
	imports: [CommonModule, TuiCarousel, TuiPagination, TuiIcon],
	templateUrl: './events-slideshow.component.html',
	styleUrl: './events-slideshow.component.less',
})
export class EventsSlideshowComponent {
	events = input<Event[]>([]);
	protected currentIndex = 0;

	navigateTo(link: string) {
		console.log('Navigating to:', link);
		window.location.href = link;
	}

	trackByEventId(index: number, event: Event): string | null {
		return event.id;
	}
}
