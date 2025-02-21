import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAuthInfo } from '../../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthState {
	private stateItem = new BehaviorSubject<IAuthInfo | null>(null);
	stateItem$ = this.stateItem.asObservable();

	constructor() {
		const storageItem = localStorage.getItem('user');
		if (!storageItem) {
			this.removeState();
			return;
		}
		const _localUser = <IAuthInfo>JSON.parse(storageItem);

		if (this.checkAuth(_localUser)) {
			this.setState(_localUser);
		} else {
			this.logout();
		}
	}

	logout(): void {
		this.removeState();
		localStorage.removeItem('user');
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

	checkAuth = (auth: IAuthInfo | null): boolean => {
		return true;
	};
}
