import {
	patchState,
	signalStore,
	withComputed,
	withHooks,
	withMethods,
	withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { catchError, finalize, map, Observable, tap, throwError } from 'rxjs';
import { DashboardService, DashboardData, DashboardMetric, DashboardEvent, DashboardActivity, DashboardReminder } from '@mandela-alumni-webapp/core-data';

type DashboardState = {
	adminData: DashboardData | null;
	userData: DashboardData | null;
	isLoading: boolean;
	error: string | null;
};

const initialState: DashboardState = {
	adminData: null,
	userData: null,
	isLoading: false,
	error: null,
};

export const DashboardStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState),
	withComputed((store) => ({
		// Computed selectors for admin dashboard
		adminMetrics: computed(() => store.adminData()?.metrics ?? []),
		adminEvents: computed(() => store.adminData()?.events ?? []),
		adminActivities: computed(() => store.adminData()?.activities ?? []),
		adminReminders: computed(() => store.adminData()?.reminders ?? []),

		// Computed selectors for user dashboard
		userMetrics: computed(() => store.userData()?.metrics ?? []),
		userEvents: computed(() => store.userData()?.events ?? []),
		userActivities: computed(() => store.userData()?.activities ?? []),
		userReminders: computed(() => store.userData()?.reminders ?? []),

		// Shared computed selectors
		reminders: computed(() => store.adminData()?.reminders ?? store.userData()?.reminders ?? []),
	})),
	withMethods((store, dashboardService = inject(DashboardService)) => ({
		// Load admin dashboard data
		loadAdminDashboard(): Observable<DashboardData> {
			patchState(store, (state) => ({
				...state,
				isLoading: true,
				error: null,
			}));

			return dashboardService.getMockAdminDashboard().pipe(
				catchError((error) => {
					patchState(store, (state) => ({
						...state,
						error: error.message,
					}));
					console.error('Error loading admin dashboard:', error);
					return throwError(() => error);
				}),
				tap((data) => {
					patchState(store, (state) => ({
						...state,
						adminData: data,
					}));
				}),
				finalize(() => {
					patchState(store, (state) => ({
						...state,
						isLoading: false,
					}));
				}),
			);
		},

		// Load user dashboard data
		loadUserDashboard(): Observable<DashboardData> {
			patchState(store, (state) => ({
				...state,
				isLoading: true,
				error: null,
			}));

			return dashboardService.getMockUserDashboard().pipe(
				catchError((error) => {
					patchState(store, (state) => ({
						...state,
						error: error.message,
					}));
					console.error('Error loading user dashboard:', error);
					return throwError(() => error);
				}),
				tap((data) => {
					patchState(store, (state) => ({
						...state,
						userData: data,
					}));
				}),
				finalize(() => {
					patchState(store, (state) => ({
						...state,
						isLoading: false,
					}));
				}),
			);
		},

		// Load specific data sections
		loadAdminMetrics(): Observable<DashboardMetric[]> {
			return dashboardService.getAdminMetrics().pipe(
				tap((metrics) => {
					if (store.adminData()) {
						patchState(store, (state) => ({
							...state,
							adminData: {
								...state.adminData!,
								metrics,
							},
						}));
					}
				}),
			);
		},

		loadUserMetrics(): Observable<DashboardMetric[]> {
			return dashboardService.getUserMetrics().pipe(
				tap((metrics) => {
					if (store.userData()) {
						patchState(store, (state) => ({
							...state,
							userData: {
								...state.userData!,
								metrics,
							},
						}));
					}
				}),
			);
		},

		loadRecentActivities(): Observable<DashboardActivity[]> {
			return dashboardService.getRecentActivities().pipe(
				tap((activities) => {
					if (store.userData()) {
						patchState(store, (state) => ({
							...state,
							userData: {
								...state.userData!,
								activities,
							},
						}));
					}
				}),
			);
		},

		loadUpcomingEvents(): Observable<DashboardEvent[]> {
			return dashboardService.getUpcomingEvents().pipe(
				tap((events) => {
					if (store.userData()) {
						patchState(store, (state) => ({
							...state,
							userData: {
								...state.userData!,
								events,
							},
						}));
					}
				}),
			);
		},

		loadReminders(): Observable<DashboardReminder[]> {
			return dashboardService.getReminders().pipe(
				tap((reminders) => {
					if (store.userData()) {
						patchState(store, (state) => ({
							...state,
							userData: {
								...state.userData!,
								reminders,
							},
						}));
					}
				}),
			);
		},

		// Clear dashboard data
		clearDashboard() {
			patchState(store, (state) => ({
				...state,
				adminData: null,
				userData: null,
				error: null,
			}));
		},

		// Clear error
		clearError() {
			patchState(store, (state) => ({
				...state,
				error: null,
			}));
		},
	})),

	withHooks((store) => {
		return {
			onInit() {
				// Initialize dashboard store
				console.log('Dashboard store initialized');
			},
		};
	}),
); 