import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IRegister } from '../../models/register-data';

@Injectable({
	providedIn: 'root',
})
export class AccountService {
	private _newMemberUrl = `${environment.domain}/auth/register`;
	http = inject(HttpClient);

	constructor() {}

	register(payload: IRegister): Observable<any> {
		const dto = {
			password: payload.password,
			email: payload.email,
			lastname: payload.lastName,
			firstname: payload.firstName,
			phone: payload.phone,
		};
		return this.http.post<IRegister>(this._newMemberUrl, dto);
	}
}
