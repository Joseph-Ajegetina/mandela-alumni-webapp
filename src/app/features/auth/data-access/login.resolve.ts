import { inject, Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	MaybeAsync,
	RedirectCommand,
	Resolve,
	Router,
	RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './services/auth.service';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginResolve implements Resolve<boolean> {
	authState = inject(AuthService);
	router = inject(Router);

	constructor() {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.authState.stateItem$.pipe(
			map((user) => {
				if (user) {
					console.log(user);
					this.router.navigate(['/dashboard']);
					return false;
				}
				return true;
			}),
		);
	}
}
