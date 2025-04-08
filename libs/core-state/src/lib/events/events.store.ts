import {
	getState,
	patchState,
	signalStore,
	withComputed,
	withHooks,
	withMethods,
	withProps,
	withState,
} from '@ngrx/signals';
import { Event } from '@mandela-alumni-webapp/api-interfaces';
import { EventsService } from '@mandela-alumni-webapp/core-data';
import { computed, effect, inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

type EventsState = {
	isLoading: boolean;
	error: string | null;
	initialized: boolean;
	filter: { order: 'asc' | 'desc'; type: 'online' | 'physical' | 'hybrid' | null };
	searchTerm: string;
};

const initialState: EventsState = {
	isLoading: false,
	initialized: false,
	error: null,
	searchTerm: '',
	filter: { order: 'asc', type: null },
};

export const EventStore = signalStore(
	withState(initialState),
	withProps((store, eventService = inject(EventsService)) => ({
		_eventsResource: rxResource<Event[], string>({
			request: store.searchTerm,
			loader: ({ request: searchTerm }) =>
				eventService.all().pipe(
					map((events) => {
						patchState(store, { initialized: true });
						console.log(events);
						console.log(searchTerm);
						const filteredEvents = events.filter((event) =>
							!!searchTerm ? event.name.toLowerCase().includes(searchTerm.toLowerCase()) : true,
						);
						console.log(filteredEvents);
						return filteredEvents;
					}),
					catchError((error) => {
						console.error('Error fetching events:', error);
						const fallback = JSON.parse(localStorage.getItem('events') || '[]') as Event[];
						return of(fallback);
					}),
				),
		}),
	})),
	withComputed(({ filter, _eventsResource }) => ({
		filteredEvents: computed(() => {
			const type = filter.type();
			const events = _eventsResource.value() || [];

			if (!type) return events;
			return events.filter((event) => event.type === type);
		}),
		latestEvents: computed(() => {
			const allEvents = _eventsResource.value() || [];
			return [...allEvents]
				.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
				.slice(0, 3);
		}),

		events: computed(() => _eventsResource.value() || []),
		eventsLoading: computed(() => _eventsResource.isLoading()),
		eventsLoadingError: computed(() => _eventsResource.error()),
	})),
	withMethods((store, eventsService = inject(EventsService)) => ({
		updateSearchTerm(query: string): void {
			patchState(store, (state) => ({
				...state,
				searchTerm: query,
			}));
		},

		updateType(type: 'online' | 'physical' | 'hybrid' | null): void {
			patchState(store, (state) => ({
				...state,
				filter: { ...state.filter, type },
			}));
		},

		addEvent(event: FormData): void {
			eventsService.create(event).subscribe((newEvent) => {
				store._eventsResource.update((events) => [newEvent, ...(events ?? [])]);
			});
		},
	})),
	withHooks({
		onInit(store) {
			effect(() => {
				const state = getState(store);
				if (state.initialized) {
					localStorage.setItem('events', JSON.stringify(store.events()));
				}
			});
		},
	}),
);
