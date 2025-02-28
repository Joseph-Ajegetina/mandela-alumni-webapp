import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { eventModel } from './shared/event.model';
import { QuickLinkService } from './services/quicklinks.service';
import { UpcomingEventService } from './services/upcomingevent.service';
import { TuiTitle } from '@taiga-ui/core';

@Component({
	selector: 'app-event',
	imports: [CommonModule, TuiTitle],
	templateUrl: './event.component.html',
	styleUrl: './event.component.less',
})
export class EventComponent implements OnInit {
	quickLinkContents:eventModel[]=[];
	upcomingContents: eventModel[]= [];

	constructor(private quickLinkService: QuickLinkService, 
				private upcomingEventService: UpcomingEventService) {}

	ngOnInit(): void {
		this.quickLinkContents = this.quickLinkService.getUserData();
		this.upcomingContents = this.upcomingEventService.getUserData();
	}

}
