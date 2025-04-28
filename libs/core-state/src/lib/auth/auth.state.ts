import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAuthInfo } from '@mandela-alumni-webapp/api-interfaces';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthState {
	router = inject(Router);

	// create an internal subject and an observable to keep track
	private stateItem = new BehaviorSubject<IAuthInfo | null>(null);
	stateItem$ = this.stateItem.asObservable();

	get getRedirectUrl(): string {
		return localStorage.getItem('redirectUrl') || '';
	}

	set redirectUrl(value: string) {
		localStorage.setItem('redirectUrl', value);
	}

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

	getToken() {
		const _auth = this.stateItem.getValue();
		return _auth && this.checkAuth(_auth) ? _auth.accessToken : '';
	}

	getRefreshToken() {
		const _auth = this.stateItem.getValue();
		return _auth && this.checkAuth(_auth) ? _auth.refreshToken : '';
	}

	setState(user: IAuthInfo): void {
		this.stateItem.next(user);
	}

	removeState(): void {
		this.stateItem.next(null);
	}

	updateState(item: Partial<IAuthInfo>) {
		const newItem = { ...this.stateItem.getValue(), ...item };
		this.stateItem.next(newItem);
		return this.stateItem$;
	}

	checkAuth = (user: IAuthInfo) => {
		if (!user || !user.accessToken) {
			return false;
		}

		if (Date.now() > (user?.expiresAt ?? 0)) {
			return false;
		}

		return true;
	};

	private _saveUser(user: IAuthInfo) {
		localStorage.setItem('user', JSON.stringify(user));
	}

	private _removeUser() {
		localStorage.removeItem('user');
		this.router.navigateByUrl('/login');
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

	getUser() {
		const auth = this._getUser();
		return auth?.user;
	}
}
