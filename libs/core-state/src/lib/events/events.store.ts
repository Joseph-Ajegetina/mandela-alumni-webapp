import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Event } from '@mandela-alumni-webapp/api-interfaces';
import { EventsService } from '@mandela-alumni-webapp/core-data';
import { computed, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

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
			const { query, type } = filter();
			return events().filter((event) => {
				if (!!query || !type) {
					return true;
				}

				const matchesQuery = event.name.toLowerCase().includes(query.toLowerCase());
				const matchesType = type ? event.type === type : true;
				return matchesQuery && matchesType;
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
			(await eventsService.all()).subscribe((events) => {
				patchState(store, { events, isLoading: false });
			});
		},

		async createEvent(event: any): Promise<void> {
			patchState(store, { isLoading: true });
			eventsService.create(event).subscribe((newEvent) => {
				patchState(store, (state) => ({
					events: [...state.events, newEvent],
					isLoading: false,
				}));
			});
		},
	})),
);
