import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAuthInfo } from '../../models/auth.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthState {
	router = inject(Router);
	private stateItem = new BehaviorSubject<IAuthInfo | null>(null);
	stateItem$ = this.stateItem.asObservable();

	constructor() {
		const _localUser = this._getUser();
		if (!_localUser) {
			this.removeState();
			return;
		}

		if (this.checkAuth(_localUser)) {
			this.setState(_localUser);
		} else {
			this.logout(false);
		}
	}

	logout(reroute = false): void {
		this.removeState();
		localStorage.removeItem('user');
		localStorage.removeItem('redirectUrl');

		if (reroute) {
			this.router.navigateByUrl('/login');
		}
	}

	getToken(): string | null {
		const _auth = this.stateItem.getValue();
		return this.checkAuth(_auth) ? _auth && _auth.accessToken : '';
	}

	getRefreshToken(): string | null {
		const _auth = this.stateItem.getValue();
		return this.checkAuth(_auth) ? _auth && _auth.accessToken : '';
	}

	setState(user: IAuthInfo): void {
		this.stateItem.next(user);
	}

	removeState(): void {
		this.stateItem.next(null);
	}

	checkAuth = (user: IAuthInfo | null): boolean => {
		if (!user || !user.accessToken) {
			return false;
		}

		if (Date.now() > user.expiresIn) {
			return false;
		}

		return true;
	};

	private _saveUser(user: IAuthInfo) {
		localStorage.setItem('user', JSON.stringify(user));
	}

	private _removeUser() {
		localStorage.removeItem('user');
	}

	private _getUser(): IAuthInfo | null {
		const userString = localStorage.getItem('user');
		const _localUser: IAuthInfo = userString ? JSON.parse(userString) : null;
		if (_localUser && _localUser.accessToken) {
			return <IAuthInfo>_localUser;
		}

		return null;
	}

	saveSession(user: IAuthInfo): IAuthInfo | null {
		if (user.accessToken) {
			this._saveUser(user);
			this.setState(user);

			return user;
		} else {
			this._removeUser();
			this.removeState();
			return null;
		}
	}

	updateSession(user: IAuthInfo) {
		const _localUser = this._getUser();
		if (_localUser) {
			_localUser.accessToken = user.accessToken;
			_localUser.refreshToken = user.refreshToken;

			this._saveUser(user);
			this.setState(user);
		} else {
			this._removeUser();
			this.removeState();
		}
	}

	get getRedirectUrl(): string {
		return localStorage.getItem('redirectUrl') || '';
	}

	set redirectUrl(value: string) {
		localStorage.setItem('redirectUrl', value);
	}
}
