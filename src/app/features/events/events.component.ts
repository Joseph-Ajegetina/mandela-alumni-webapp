import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiDropdown, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TuiSearch } from '@taiga-ui/layout';
import { TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { CardsComponent } from 'src/app/shared/ui/cards/cards.component';
import { SliderComponent } from 'src/app/shared/ui/slider/slider.component';
import { EventStore } from '@mandela-alumni-webapp/core-state';
import { CARDS, Slide } from '@mandela-alumni-webapp/core-data';

@Component({
	selector: 'app-events',
	imports: [
		CommonModule,
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
	],
	templateUrl: './events.component.html',
	styleUrl: './events.component.less',
	providers: [EventStore],
})
export class EventsComponent implements OnInit {
	cards = CARDS;
	slide = Slide;
	readonly eventStore = inject(EventStore);

	readonly form = new FormGroup({
		search: new FormControl(),
	});

	ngOnInit(): void {
		const query = this.eventStore.filter.query;
		this.eventStore.loadByQuery(query);
	}

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
