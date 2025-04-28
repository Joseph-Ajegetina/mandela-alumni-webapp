import {
	patchState,
	signalStore,
	withComputed,
	withHooks,
	withMethods,
	withState,
} from '@ngrx/signals';
import { IAuthInfo, IUser, NewAuthInfo } from '@mandela-alumni-webapp/api-interfaces';
import { AuthState } from '../auth/auth.state';
import { computed, inject } from '@angular/core';
import { catchError, finalize, map, Observable, tap, throwError } from 'rxjs';
import { UsersService } from '@mandela-alumni-webapp/core-data';

type UserState = {
	currentUser: IUser | null;
	isUpdating: boolean;
	error: string | null;
};

const initialState: UserState = {
	currentUser: null,
	isUpdating: false,
	error: null,
};

export const UserStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState),
	withComputed((store) => ({
		isAdmin: computed(() => {
			return store.currentUser()?.superAdmin ?? false;
		}),
	})),
	withMethods((store, userService = inject(UsersService), authState = inject(AuthState)) => ({
		updateUser(id: number, payload: FormData): Observable<any> {
			patchState(store, (state) => ({
				...state,
				isUpdating: true,
			}));
			return userService.update(id, payload).pipe(
				catchError((error) => {
					patchState(store, (state) => ({
						...state,
						error: error,
					}));
					console.log('error  ', error);
					return throwError(() => error);
				}),
				tap((user) => {
					patchState(store, (state) => ({
						...state,
						currentUser: user,
					}));
				}),
				finalize(() => {
					patchState(store, (state) => ({
						...state,
						isUpdating: false,
					}));
				}),
			);
		},
	})),

	withHooks((store) => {
		const authState = inject(AuthState);

		return {
			onInit() {
				const storageItem = localStorage.getItem('user');
				let localUser: IUser | null = null;

				if (storageItem) {
					try {
						localUser = JSON.parse(storageItem);
					} catch (e) {
						console.error('Failed to parse local user from storage', e);
					}
				}
				authState.stateItem$.pipe(map((state) => state?.user ?? localUser)).subscribe((user) => {
					patchState(store, { currentUser: user });
				});
			},
		};
	}),
);
