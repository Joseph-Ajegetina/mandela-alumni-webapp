import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Event, ExistingEvent, NewEvent } from '@mandela-alumni-webapp/api-interfaces'

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  http = inject(HttpClient);
	url = environment.domain;
  model = '/events';
	constructor() {}

  all() {
    return this.http.get<Event[]>(this.getUrl());
  }

  find(id: string) {
    return this.http.get<Event>(this.getUrlWithId(id));
  }

  create(event: NewEvent) {
    return this.http.post(this.getUrl(), event);
  }

  update(event: ExistingEvent) {
    return this.http.put(this.getUrlWithId(event.id), event);
  }

  delete(event: ExistingEvent) {
    return this.http.delete(this.getUrlWithId(event.id));
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
