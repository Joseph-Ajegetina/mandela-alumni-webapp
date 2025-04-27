import { Injectable } from '@angular/core';
import { Event } from './event.model';
import { Observable, of } from 'rxjs';

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Leadership Summit 2025',
    description:
      'Donec ac risus metus. Suspendisse ultrices purus sed metus rutrum…',
    date: '2025-05-21',
    time: '15:00',
    eventMode: 'Hybrid',
    location: 'Accra, Ghana',
    imageUrl: 'assets/images/leadership-summit.jpg',
  },
  {
    id: '2',
    title: 'Global Alumni Meetup',
    description:
      'Join alumni from around the world for networking and learning.',
    date: '2025-06-10',
    time: '10:00',
    eventMode: 'In-Person',
    location: 'London, UK',
    imageUrl: 'assets/images/alumni-meetup.jpg',
  },
];

@Injectable({
  providedIn: 'root'
})
export class EventService {
  getEventById(id: string): Observable<Event> {
    const found = MOCK_EVENTS.find(e => e.id === id);
    return of(found!);
  }
}
