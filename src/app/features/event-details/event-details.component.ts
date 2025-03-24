import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy} from '@angular/core';
import {TUI_FALSE_HANDLER} from '@taiga-ui/cdk';
import {TuiButton} from '@taiga-ui/core';
import {TuiButtonLoading} from '@taiga-ui/kit';
import {map, startWith, Subject, switchMap, timer} from 'rxjs';

@Component({
	selector: 'app-event-details',
	imports: [CommonModule, AsyncPipe, TuiButton, TuiButtonLoading],
	templateUrl: './event-details.component.html',
	styleUrl: './event-details.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EventDetailsComponent {
	protected readonly trigger$ = new Subject<void>();
    protected readonly loading$ = this.trigger$.pipe(
        switchMap(() => timer(2000).pipe(map(TUI_FALSE_HANDLER), startWith('Loading'))),
    );
}
