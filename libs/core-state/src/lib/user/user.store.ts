import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { IUser } from '@mandela-alumni-webapp/api-interfaces';
import { AuthState } from '../auth/auth.state';
import { computed, inject } from '@angular/core';
import { map } from 'rxjs';

type UserState = {
    currentUser: IUser | null;
};

const initialState: UserState = {
    currentUser: null
};

export const UserStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withComputed((store) => ({
        isAdmin: computed(() => {
            return store.currentUser()?.superAdmin ?? false;
        }
        )
    })),
    withMethods((store) => ({
        updateUser(user: IUser): void {
            patchState(store, { currentUser: user });
        }
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

                authState.stateItem$
                    .pipe(map((state) => state?.user ?? localUser))
                    .subscribe((user) => {
                        patchState(store, { currentUser: user });
                    });
            }
        };
    })
);

