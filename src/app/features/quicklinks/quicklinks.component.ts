import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';	
import { TuiTitle} from '@taiga-ui/core';
import { QuickLinkService } from './data/services/quickLinkService.service';
import { quickLinkModel} from './data/shared/data.model';
import { UpcomingeventService } from './data/services/upcomingevent.service';


@Component({
	selector: 'app-quicklinks',
	standalone: true,
	imports: [CommonModule,TuiTitle],
	templateUrl: './quicklinks.component.html',
	styleUrl: './quicklinks.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuicklinksComponent implements OnInit {
	quickLinkContents:quickLinkModel[]=[];
	upcomingContents: quickLinkModel[]= [];

	constructor(private quickLinkService: QuickLinkService, private upcomingEventService:UpcomingeventService) {}

	ngOnInit(): void {
		this.quickLinkContents = this.quickLinkService.getUserData();
		this.upcomingContents = this.upcomingEventService.getUserData();
	}
	
}