import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RegisterData } from '../../models/register-data';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IUser } from '../../../../shared/interfaces/user';
import { IAuthInfo } from '../../models/auth.model';
import { environment } from 'src/environments/environment.prod';
import { AuthState } from '../state/auth.state';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private _loginUrl = `${environment.domain}/auth/login`;
	private _refreshUrl = `${environment.domain}/auth/refresh`;
	private authState = inject(AuthState);

	http: HttpClient = inject(HttpClient);

	constructor() {}

	login(email: string, password: string): Observable<any> {
		return this.http.post<IUser>(this._loginUrl, { email, password }).pipe(
			map((response) => {
				const returnUser: IAuthInfo = <IAuthInfo>(<any>response);
				localStorage.setItem('user', JSON.stringify(returnUser));
				this.authState.setState(returnUser);
				return returnUser;
			}),
		);
	}

	registerUser(data: RegisterData): Observable<IUser> {
		return this.http.post<IUser>('/api/register', data);
	}

	refreshToken(): Observable<boolean> {
		return this.http.post(this._refreshUrl, { token: this.authState.getRefreshToken() }).pipe(
			map((response) => {
				if (!response) {
					throw new Error('Oh oh');
				}

				const retUser: IAuthInfo = <IAuthInfo>(<any>response);
				localStorage.setItem('user', JSON.stringify(retUser));
				this.authState.setState(retUser);

				return true;
			}),
		);
	}
}
