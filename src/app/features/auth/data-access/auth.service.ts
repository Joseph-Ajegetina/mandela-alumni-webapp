import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RegisterData } from '../models/register-data';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';
import { IAuthInfo } from '../models/auth.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private _loginUrl = `${environment.domain}/auth/login`;
	// private _loginUrl = 'api/login';
	http: HttpClient = inject(HttpClient);

	constructor() {}

	login(email: string, password: string): Observable<any> {
		return this.http.post<User>(this._loginUrl, { email, password }).pipe(
			map((response) => {
				const returnUser: IAuthInfo = <IAuthInfo>(<any>response).user;
				localStorage.setItem('user', JSON.stringify(returnUser));
				return returnUser;
			}),
		);
	}

	registerUser(data: RegisterData): Observable<User> {
		return this.http.post<User>('/api/register', data);
	}
}
