import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUser } from '../../../shared/interfaces/user';
import { IAuthInfo, NewAuthInfo } from '../../models/auth.model';
import { environment } from 'src/environments/environment.prod';
import { AuthState } from '@mandela-alumni-webapp/core-state';

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
				const returnUser: IAuthInfo = NewAuthInfo(<any>response);
				return this.authState.saveSession(returnUser);
			}),
		);
	}

	refreshToken(): Observable<boolean> {
		return this.http.post(this._refreshUrl, { token: this.authState.getRefreshToken() }).pipe(
			map((response) => {
				if (!response) {
					throw new Error('Oh oh');
				}

				const retUser: IAuthInfo = NewAuthInfo(<any>response);
				this.authState.updateSession(retUser);

				return true;
			}),
		);
	}
}
