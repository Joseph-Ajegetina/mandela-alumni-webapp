import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventStore, UserStore } from '@mandela-alumni-webapp/core-state';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { RouterLink } from '@angular/router';
import { TuiIcon, TuiDropdown, TuiTextfield, TuiButton, TuiLoader } from '@taiga-ui/core';
import { TuiFilterByInputPipe } from '@taiga-ui/kit';
import { TuiSearch } from '@taiga-ui/layout';
import { TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { CardsComponent } from 'src/app/shared/ui/cards/cards.component';
import { EventsSlideshowComponent } from '../../ui/events-slideshow/events-slideshow.component';
import { EventCardComponent } from '../../ui/event-card/event-card.component';

@Component({
	selector: 'app-events-list',
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
		EventCardComponent,
	],
	templateUrl: './events-list.component.html',
	styleUrl: './events-list.component.less',
	providers: [EventStore],
})
export class EventsListComponent implements OnInit{
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

	isAtTop = false; 

	@HostListener('window:scroll', [])
	onScroll(): void {
		this.isAtTop = window.scrollY < 100; 
	}

	toggleScroll(): void {
		if (this.isAtTop) {
			window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
		} else {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}
}
