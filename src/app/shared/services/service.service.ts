import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IRegister, IRegisterMessage, IRegisterSubmit } from '../../features/auth/models/register';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
	providedIn: 'root',
})
export class ServiceService {
	constructor(private http: HttpClient) {}

	// register a service
	registerUser(userData: IRegister): Observable<IRegisterMessage> {
		// Transform the data to exclude dob and role
		const transformedUserData: IRegisterSubmit = {
			password: userData.password,
			email: userData.email,
			lastname: userData.lastname,
			firstname: userData.firstname,
			phone: userData.phone,
		};

		// Send the request to the API and return the response as an Observable of IRegisterMessage.
		// This assumes the API returns an IRegisterMessage object in response to a successful registration
		return this.http.post<IRegisterMessage>(
			`${environment.API_URL}/auth/register`,
			transformedUserData,
		);
	}
}
