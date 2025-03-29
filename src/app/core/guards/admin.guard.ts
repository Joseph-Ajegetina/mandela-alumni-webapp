import { inject, Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanActivateChild,
	Route,
	Router,
	RouterStateSnapshot,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthState } from 'src/app/features/auth/data-access/state/auth.state';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate, CanActivateChild {
	authState = inject(AuthState);
	_router = inject(Router);

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const user = this.authState.getUser();

		if (!user || !user.approvedAt) {
			this._router.navigateByUrl('pending');
			return false;
		}
		return true;
	}

	canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const user = this.authState.getUser();
		if (!user || !user.approvedAt) {
			this._router.navigateByUrl('pending');
			return false;
		}
		return true;
	}
}
