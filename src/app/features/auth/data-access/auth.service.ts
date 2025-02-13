import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RegisterData } from '../models/register-data';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	http: HttpClient = inject(HttpClient);

	constructor() {}

	registerUser(data: RegisterData): Observable<User> {
		return this.http.post<User>('/api/register', data);
	}
}
