import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';
import { TuiButton, TuiLoader } from '@taiga-ui/core';
import { TuiButtonLoading } from '@taiga-ui/kit';
import { EventStore } from '@mandela-alumni-webapp/core-state';
import { EventsService } from '@mandela-alumni-webapp/core-data';
import { Event } from '@mandela-alumni-webapp/api-interfaces';

@Component({
	selector: 'app-event-details',
	imports: [CommonModule, AsyncPipe, TuiButton, TuiButtonLoading, TuiLoader, RouterLink],
	templateUrl: './event-details.component.html',
	styleUrl: './event-details.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [EventStore],
})
export class EventDetailsComponent implements OnInit {
	private readonly route = inject(ActivatedRoute);
	private readonly eventsService = inject(EventsService);
	currentEvent: Event | null = null;
	readonly isLoading = signal(false);

	ngOnInit(): void {
		const eventId = this.route.snapshot.paramMap.get('id');
		if (eventId) {
			this.isLoading.set(true);
			this.eventsService.find(eventId).subscribe({
				next: (result) => {
					this.currentEvent = result?.dataValues;
					console.log('currentEvent', this.currentEvent);
				},
				error: (error) => {
					console.error('Error fetching event:', error);
				},
				complete: () => {
					this.isLoading.set(false);
				},
			});
		}
	}
}
