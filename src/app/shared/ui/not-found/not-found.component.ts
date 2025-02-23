import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiBlockStatus } from '@taiga-ui/layout';

@Component({
	selector: 'app-not-found',
	imports: [CommonModule, TuiBlockStatus],
	templateUrl: './not-found.component.html',
	styleUrl: './not-found.component.less',
})
export class NotFoundComponent {}
