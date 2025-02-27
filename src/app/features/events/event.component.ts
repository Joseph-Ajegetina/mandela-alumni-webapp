import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';	
import { TuiTitle} from '@taiga-ui/core';
import { QuickLinkService } from './data/services/quickLinkService.service';
import { quickLinkModel} from './data/shared/data.model';
import { UpcomingeventService } from './data/services/upcomingevent.service';


@Component({
	selector: 'app-events',
	standalone: true,
	imports: [CommonModule,TuiTitle],
	templateUrl: './event.component.html',
	styleUrl: './event.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent implements OnInit {
	quickLinkContents:quickLinkModel[]=[];
	upcomingContents: quickLinkModel[]= [];

	constructor(private quickLinkService: QuickLinkService, private upcomingEventService:UpcomingeventService) {}

	ngOnInit(): void {
		this.quickLinkContents = this.quickLinkService.getUserData();
		this.upcomingContents = this.upcomingEventService.getUserData();
	}
	
}