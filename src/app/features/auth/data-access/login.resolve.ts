import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthState } from './state/auth.state';

@Injectable({ providedIn: 'root' })
export class LoginResolve implements Resolve<boolean> {
	authState = inject(AuthState);
	router = inject(Router);

	constructor() {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.authState.stateItem$.pipe(
			map((user) => {
				if (user) {
					console.log(user);
					this.router.navigate([this.authState.redirectUrl || '/dashboard']);
					return false;
				}
				return true;
			}),
		);
	}
}
