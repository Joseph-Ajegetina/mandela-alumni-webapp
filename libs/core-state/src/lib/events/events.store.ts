import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Event } from '@mandela-alumni-webapp/api-interfaces';
import { EventsService } from '@mandela-alumni-webapp/core-data';
import { computed, inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

type EventsState = {
	events: Event[];
	isLoading: boolean;
	error: string | null;
	filter: { query: string; order: 'asc' | 'desc'; type: 'online' | 'physical' | 'hybrid' | null };
};

const initialState: EventsState = {
	events: [],
	isLoading: false,
	error: null,
	filter: { query: '', order: 'asc', type: null },
};

export const EventStore = signalStore(
	withState(initialState),
	withComputed(({ events, filter }) => ({
		eventsCount: computed(() => events().length),
		filteredEvents: computed(() => {
			const { query, order, type } = filter();
			return events()
				.filter((event) => {
					const matchesQuery = event.name.toLowerCase().includes(query.toLowerCase());
					const matchesType = type ? event.type === type : true;
					return matchesQuery && matchesType;
				})
				.sort((a, b) => {
					if (order === 'asc') {
						return a.date.getTime() - b.date.getTime();
					} else {
						return b.date.getTime() - a.date.getTime();
					}
				});
		}),

		latestEvents: computed(() => {
			const allEvents = events();
			if (allEvents.length === 0) return [];

			return [...allEvents]
				.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
				.slice(0, 3);
		}),
	})),
	withMethods((store, eventsService = inject(EventsService)) => ({
		updateQuery(query: string): void {
			patchState(store, (state) => ({
				filter: { ...state.filter, query },
			}));
		},
		updateOrder(order: 'asc' | 'desc'): void {
			patchState(store, (state) => ({
				filter: { ...state.filter, order },
			}));
		},
		async loadAll(): Promise<void> {
			patchState(store, { isLoading: true });
			const events = await eventsService.all();
			patchState(store, { events, isLoading: false });
		},
	})),
);
