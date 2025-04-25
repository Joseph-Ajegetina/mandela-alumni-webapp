import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRegister } from '@mandela-alumni-webapp/api-interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
	providedIn: 'root',
})
export class UsersService {
	private _newMemberUrl = `${environment.domain}/auth/register`;
	http = inject(HttpClient);
	url = environment.domain;
	model = '/user';

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

	getApprovals(): Observable<any> {
		return this.http.get(this.getUrl());
	}

	update(id: number, payload: any): Observable<any> {
		return this.http.patch(this.getUrlWithId(id), payload);
	}
	getById(id: number): Observable<IRegister> {
		return this.http.get<IRegister>(this.getUrlWithId(id));
	  }
	  
	private getUrl() {
		return `${environment.domain}${this.model}`;
	}

	private getUrlWithId(id: number) {
		return `${this.getUrl()}/${id}`;
	}
}
