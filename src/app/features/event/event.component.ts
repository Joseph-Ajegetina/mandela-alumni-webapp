import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventPageComponent } from './quicklinks/event-page.component';

@Component({
	selector: 'app-event',
	imports: [CommonModule, EventPageComponent],
	templateUrl: './event.component.html',
	styleUrl: './event.component.less',
})
export class EventComponent {}
