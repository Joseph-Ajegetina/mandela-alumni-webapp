import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Event } from '@mandela-alumni-webapp/api-interfaces';
import { EVENTS } from './mock-data';
import { of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class EventsService {
	http = inject(HttpClient);
	url = environment.domain;
	model = '/events';
	constructor() {}

	 all() {
		// sleep(20000)
		// return of(EVENTS)
		return this.http.get<Event[]>(this.getUrl());
	}

	find(id: string) {
		return this.http.get<Event>(this.getUrlWithId(id));
	}

	create(event: FormData) {
		return this.http.post<Event>(this.getUrl(), event);
	}

	update(event: Event) {
		return this.http.put(this.getUrlWithId(event.id!), event);
	}

	delete(event: Event) {
		return this.http.delete(this.getUrlWithId(event.id!));
	}

	getByQuery(query: string) {
		return this.http.get<Event[]>(this.getUrl());
	}

	private getUrl() {
		return `${environment.domain}${this.model}`;
	}

	private getUrlWithId(id: string) {
		return `${this.getUrl()}/${id}`;
	}
}
const sleep = async (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
