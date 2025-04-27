import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable} from 'rxjs';
import {ChangeDetectionStrategy} from '@angular/core';
import {TUI_FALSE_HANDLER} from '@taiga-ui/cdk';
import {TuiButton} from '@taiga-ui/core';
import {TuiButtonLoading} from '@taiga-ui/kit';
import {map, startWith, Subject, switchMap, timer} from 'rxjs';
import {EventService} from './data-access/event/event.service';
import {Event} from './data-access/event/event.model';

@Component({
	selector: 'app-event-details',
	imports: [CommonModule, AsyncPipe, TuiButton, TuiButtonLoading],
	templateUrl: './event-details.component.html',
	styleUrl: './event-details.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EventDetailsComponent {
	 // Injected services
	 private readonly route = inject(ActivatedRoute);
	 private readonly eventService = inject(EventService);
   
	 /** 1️⃣ Fetch the event ID from the URL and load the mock data */
	 event$: Observable<Event> = this.route.paramMap.pipe(
	   map(params => params.get('id')!),                       // extract ":id"
	   switchMap(id => this.eventService.getEventById(id))     // fetch mock event
	 );

	protected readonly trigger$ = new Subject<void>();
    protected readonly loading$ = this.trigger$.pipe(
        switchMap(() => timer(2000).pipe(map(TUI_FALSE_HANDLER), startWith('Loading'))),
    );

	/** 3️⃣ Navigate back */
	goBack(): void {
		history.back();
	  }
	
	  /** 4️⃣ Simulate registration */
	  register(id: string): void {
		this.trigger$.next();
		console.log('Register for event', id);
	  }
}
