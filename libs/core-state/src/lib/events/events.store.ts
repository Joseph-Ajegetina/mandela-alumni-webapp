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

		loadByQuery: rxMethod<string>(
			pipe(
				debounceTime(300),
				distinctUntilChanged(),
				tap(() => patchState(store, { isLoading: true })),
				switchMap((query) => {
					return eventsService.getByQuery(query).pipe(
						tapResponse({
							next: (events) => patchState(store, { events }),
							error: (error) => console.error(error),
							finalize: () => patchState(store, { isLoading: false }),
						}),	
					);
				})
			),
		),
	})),
);
