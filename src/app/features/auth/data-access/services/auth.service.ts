import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RegisterData } from '../../models/register-data';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IUser } from '../../../../shared/interfaces/user';
import { IAuthInfo } from '../../models/auth.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private _loginUrl = `${environment.domain}/auth/login`;
	private stateItem = new BehaviorSubject<IAuthInfo | null>(null);
	stateItem$ = this.stateItem.asObservable();
	// private _loginUrl = 'api/login';
	http: HttpClient = inject(HttpClient);

	constructor() {}

	login(email: string, password: string): Observable<any> {
		return this.http.post<IUser>(this._loginUrl, { email, password }).pipe(
			map((response) => {
				const returnUser: IAuthInfo = <IAuthInfo>(<any>response);
				localStorage.setItem('user', JSON.stringify(returnUser));
				this.stateItem.next(returnUser);
				return returnUser;
			}),
		);
	}

	registerUser(data: RegisterData): Observable<IUser> {
		return this.http.post<IUser>('/api/register', data);
	}

	logout(): void {
		this.removeState();
		localStorage.removeItem('user');
	}

	setState(user: IAuthInfo): void {
		this.stateItem.next(user);
	}

	removeState(): void {
		this.stateItem.next(null);
	}
}

const checkAuth = (auth: IAuthInfo): boolean => {
	return true;
};

export const authFactory = (authService: AuthService) => {
	// initialize auth state

	//check item validity
	const storageItem = localStorage.getItem('user');
	if (!storageItem) {
		authService.removeState();
		return;
	}
	const _localUser = <IAuthInfo>JSON.parse(storageItem);

	if (checkAuth(_localUser)) {
		authService.setState(_localUser);
	} else {
		authService.removeState();
		localStorage.removeItem('user');
	}
};
