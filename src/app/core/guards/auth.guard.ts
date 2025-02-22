import { inject, Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanActivateChild,
	GuardResult,
	MaybeAsync,
	Route,
	Router,
	RouterStateSnapshot,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/features/auth/data-access/services/auth.service';
import { AuthState } from 'src/app/features/auth/data-access/state/auth.state';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
	authState = inject(AuthState);
	_router = inject(Router);

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		this.authState.redirectUrl = state.url;
		return this.secure(route);
	}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean> {
		this.authState.redirectUrl = state.url;
		return this.secure(childRoute);
	}

	private secure(route: ActivatedRouteSnapshot | Route): Observable<boolean> {
		return this.authState.stateItem$.pipe(
			map((user) => {
				if (!user) {
					this._router.navigateByUrl('login');
					return false;
				}
				return true;
			}),
		);
	}
}
