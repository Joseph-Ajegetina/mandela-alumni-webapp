import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TuiDropdown, TuiIcon, TuiTextfield } from '@taiga-ui/core';

import { TuiSearch } from '@taiga-ui/layout';
import { TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { SliderComponent } from '../../../shared/ui/slider/slider.component';
import { Card, Slide } from 'src/app/shared/interfaces/menu-item';
import { CardsComponent } from '../../../shared/ui/cards/cards.component';

@Component({
	selector: 'app-user-event-page',
	imports: [
		TuiIcon,

		FormsModule,
		ReactiveFormsModule,
		TuiSearch,

		TuiDropdown,

		TuiSelectModule,
		TuiTextfield,
		TuiTextfieldControllerModule,
		SliderComponent,
		TuiIcon,
		CardsComponent,
		NgFor,
	],
	templateUrl: './user-event-page.component.html',
	styleUrls: ['./user-event-page.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEventPageComponent {
	protected readonly form = new FormGroup({
		search: new FormControl(),
	});

	slide: Slide = {
		images: [
			'images/alumracle/slider1.jpg',
			'images/alumracle/slider2.jpg',
			'images/alumracle/slider3.jpg',
		],
		overlayText: {
			event_type: 'Virtual',
			title: 'Career Growth Webinar',
			description:
				'In accumsan sit amet quam nec imperdiet. Curabitug gravida eros eget felis pellentesque dictum eu nec est. Quisquet interdum ante velmsan sit amet quam nec imperdie fikhet....',
			date: 'April 04, 2025',
			time: '10:00 AM - 12:00 PM',
			buttons: [
				{ icon: '@tui.check', text: 'Register', link: '/register', style: 'register-btn' },
				{ text: 'View Details', link: '/event-details', style: 'details-btn' },
			],
		},
	};

	cards: Card[] = [
		{
			image: 'images/alumracle/slider1.jpg',

			overlayText: {
				event_type: 'Virtual',
				title: 'Career Growth Webinar',
				description:
					'In accumsan sit amet quam nec imperdiet. Curabitug gravida eros eget felis pellentesque dictum eu nec est. Quisquet interdum ante velmsan sit amet quam nec imperdie fikhet....',
				date: 'April 04, 2025',
				time: '10:00 AM',

				buttons: [
					{ icon: '@tui.check', text: 'Register', link: '/register', style: 'register-btn' },
					{ text: 'View Details', link: '/event-details', style: 'details-btn' },
				],
			},
		},

		{
			image: 'images/alumracle/slider2.jpg',

			overlayText: {
				event_type: 'Virtual',
				title: 'Career Growth Webinar',
				description:
					'In accumsan sit amet quam nec imperdiet. Curabitug gravida eros eget felis pellentesque dictum eu nec est. Quisquet interdum ante velmsan sit amet quam nec imperdie fikhet....',
				date: 'April 04, 2025',
				time: '10:00 AM',

				buttons: [
					{ icon: '@tui.check', text: 'Register', link: '/register', style: 'register-btn' },
					{ text: 'View Details', link: '/event-details', style: 'details-btn' },
				],
			},
		},

		{
			image: 'images/alumracle/slider3.jpg',

			overlayText: {
				event_type: 'Virtual',
				title: 'Career Growth Webinar',
				description:
					'In accumsan sit amet quam nec imperdiet. Curabitug gravida eros eget felis pellentesque dictum eu nec est. Quisquet interdum ante velmsan sit amet quam nec imperdie fikhet....',
				date: 'April 04, 2025',
				time: '10:00 AM',

				buttons: [
					{ icon: '@tui.check', text: 'Register', link: '/register', style: 'register-btn' },
					{ text: 'View Details', link: '/event-details', style: 'details-btn' },
				],
			},
		},
	];

	isAtTop = true; // Initially at the top

	@HostListener('window:scroll', [])
	onScroll(): void {
		this.isAtTop = window.scrollY < 100; // Detect scroll position
	}

	toggleScroll(): void {
		if (this.isAtTop) {
			window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
		} else {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}

	protected items = ['Virtual', 'In-Person', 'Hybrid'];
	protected testValue = new FormControl<string | null>(null);
}
