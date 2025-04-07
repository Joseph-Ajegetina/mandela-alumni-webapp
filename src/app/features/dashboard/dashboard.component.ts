import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { map, Observable, of } from 'rxjs';
import { IUser } from '../../shared/interfaces/user';
import { AuthState } from '@mandela-alumni-webapp/core-state';
import { TuiCalendar, TuiIcon, TuiMarkerHandler } from '@taiga-ui/core';
import { TuiDay } from '@taiga-ui/cdk';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [CommonModule, TuiCalendar, NgFor, TuiIcon],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.less',
})
export class DashboardComponent implements OnInit {
	s: IUser | null = null;
	state$: Observable<IUser | null> = of(null);
	private authState = inject(AuthState);

	selectedDays: TuiDay[] = [];
	formattedDates: { day: number; month: string }[] = [];

	ngOnInit(): void {
		this.state$ = this.authState.stateItem$.pipe(map((state) => state?.user ?? null));
		const storageItem = localStorage.getItem('user');
		if (storageItem) {
			this.s = JSON.parse(storageItem);
		}

		// Preselect three dates
		this.selectedDays = [
			new TuiDay(2025, 2, 10), // March 10, 2025
			new TuiDay(2025, 2, 15), // March 15, 2025
			new TuiDay(2025, 2, 20), // March 20, 2025
		];

		// Format preselected dates
		this.formattedDates = this.selectedDays.map(this.formatDate);
	}

	onDayClick(day: TuiDay): void {
		const index = this.selectedDays.findIndex((d) => d.daySame(day));
		if (index === -1) {
			this.selectedDays.push(day);
			this.formattedDates.push(this.formatDate(day));
		} else {
			this.selectedDays.splice(index, 1);
			this.formattedDates.splice(index, 1);
		}
	}

	formatDate(day: TuiDay): { day: number; month: string } {
		const monthAbbreviations = [
			'JAN',
			'FEB',
			'MAR',
			'APR',
			'MAY',
			'JUN',
			'JUL',
			'AUG',
			'SEP',
			'OCT',
			'NOV',
			'DEC',
		];
		return { day: day.day, month: monthAbbreviations[day.month] };
	}

	markerHandler: TuiMarkerHandler = (day: TuiDay) => {
		return this.selectedDays.some((d) => d.daySame(day)) ? ['var(--tui-primary)'] : [];
	};
}
