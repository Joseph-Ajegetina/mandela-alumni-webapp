import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiDropdown, TuiIcon, TuiLoader, TuiTextfield } from '@taiga-ui/core';
import { TuiSearch } from '@taiga-ui/layout';
import { TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { CardsComponent } from 'src/app/shared/ui/cards/cards.component';
import { EventStore, UserStore } from '@mandela-alumni-webapp/core-state';
import { EventsSlideshowComponent } from './events-slideshow/events-slideshow.component';
import { RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { TuiFilterByInputPipe } from '@taiga-ui/kit';

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
		TuiIcon,
		CardsComponent,
		TuiButton,
		EventsSlideshowComponent,
		RouterLink,
		TuiLoader,
		TuiFilterByInputPipe,
	],
	templateUrl: './events.component.html',
	styleUrl: './events.component.less',
	providers: [EventStore],
})
export class EventsComponent implements OnInit {
	readonly eventStore = inject(EventStore);
	readonly userStore = inject(UserStore);

	readonly eventModes = ['online', 'physical', 'hybrid'];
	type = signal<string | null>(null);

	form = new FormGroup({
		searchTerm: new FormControl(''),
		type: new FormControl(''),
	});

	events = this.eventStore.events;
	isLoading = this.eventStore.eventsLoading;

	constructor() {}

	ngOnInit(): void {
		this.form.valueChanges
			.pipe(
				debounceTime(300),
				distinctUntilChanged((prev, curr) => prev.searchTerm === curr.searchTerm),
			)
			.subscribe((formValue) => {
				this.eventStore.updateSearchTerm(formValue.searchTerm || '');
			});
	}

	isAtTop = false; // Initially at the top

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
}
