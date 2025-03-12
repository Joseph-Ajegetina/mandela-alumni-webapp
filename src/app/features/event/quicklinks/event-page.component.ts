import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { eventPageModel } from './shared/event-page.model';
import { EventPageService } from './services/event-page.service';
import { TuiTitle } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';

@Component({
	selector: 'app-event-page',
	imports: [CommonModule, TuiTitle, TuiAvatar],
	templateUrl: './event-page.component.html',
	styleUrl: './event-page.component.less',
})
export class EventPageComponent implements OnInit {
	upcomingContents: eventPageModel[]= [];

	constructor(private eventPageService: EventPageService) {}

	ngOnInit(): void {
		this.upcomingContents = this.eventPageService.getUserData();
	  }

}
