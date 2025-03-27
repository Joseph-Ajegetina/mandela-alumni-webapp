import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
	providedIn: 'root',
})
export class ApprovalService {
	http = inject(HttpClient);
	url = environment.domain;

	constructor() {}

	getApprovals(): Observable<any> {
		return this.http.get(`${this.url}/user`);
	}

	update(id: number, payload: any): Observable<any> {
		return this.http.patch(`${this.url}/user/${id}`, payload);
	}
}
