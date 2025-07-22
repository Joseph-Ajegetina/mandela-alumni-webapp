import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiIcon, TuiCalendar, TuiMarkerHandler } from '@taiga-ui/core';
import { TuiDay } from '@taiga-ui/cdk';
import {
	DashboardMetric,
	DashboardEvent,
	DashboardActivity,
	DashboardReminder,
} from '@mandela-alumni-webapp/core-data';

@Component({
	selector: 'app-user-dashboard-ui',
	standalone: true,
	imports: [CommonModule, TuiIcon, TuiCalendar],
	templateUrl: './user-dashboard-ui.component.html',
	styleUrls: ['./user-dashboard-ui.component.less'],
})
export class UserDashboardUiComponent implements OnInit {
	@Input() metrics: DashboardMetric[] = [];
	@Input() events: DashboardEvent[] = [];
	@Input() activities: DashboardActivity[] = [];
	@Input() reminders: DashboardReminder[] = [];
	@Input() isLoading = false;
	@Input() error: string | null = null;

	@Output() loadData = new EventEmitter<void>();
	@Output() eventClick = new EventEmitter<DashboardEvent>();
	@Output() payDues = new EventEmitter<void>();
	@Output() findAlumni = new EventEmitter<void>();
	@Output() registerEvent = new EventEmitter<void>();
	@Output() makeDonation = new EventEmitter<void>();

	selectedDays: TuiDay[] = [];

	ngOnInit(): void {
		this.initializeReminderDates();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['reminders']) {
			this.updateReminderDates();
		}
	}

	onEventClick(event: DashboardEvent): void {
		this.eventClick.emit(event);
	}

	onPayDues(): void {
		this.payDues.emit();
	}

	onFindAlumni(): void {
		this.findAlumni.emit();
	}

	onRegisterEvent(): void {
		this.registerEvent.emit();
	}

	onMakeDonation(): void {
		this.makeDonation.emit();
	}

	onDayClick(day: TuiDay): void {
		// Handle calendar day click
		console.log('Day clicked:', day);
	}

	private initializeReminderDates(): void {
		// Add some default reminder dates for demonstration
		const today = TuiDay.currentLocal();
		this.selectedDays = [
			today.append({ day: 2 }), // Membership Renewal - Due in 2 days
			today.append({ day: 1 }), // Budget Review - Due tomorrow
			today.append({ day: 10 }), // Summit Registration - Closes Jan 20
		];
	}

	private updateReminderDates(): void {
		if (this.reminders && this.reminders.length > 0) {
			this.selectedDays = this.reminders
				.map((reminder) => this.parseDateToTuiDay(reminder.dueDate))
				.filter((day) => day !== null);
		}
	}

	private parseDateToTuiDay(dateString: string): TuiDay | null {
		try {
			const date = new Date(dateString);
			return new TuiDay(date.getFullYear(), date.getMonth(), date.getDate());
		} catch {
			return null;
		}
	}

	markerHandler: TuiMarkerHandler = (day: TuiDay) => {
		return this.selectedDays.some((d) => d.daySame(day)) ? ['var(--tui-primary)'] : [];
	};

	getReminderColor(reminder: DashboardReminder): string {
		// Extract color from the reminder's color property
		if (reminder.color.includes('warning')) return 'orange';
		if (reminder.color.includes('primary')) return 'blue';
		if (reminder.color.includes('success')) return 'green';
		return 'orange'; // default
	}

	getDaysRemaining(dueDate: string): string {
		const today = new Date();
		const due = new Date(dueDate);
		const diffTime = due.getTime() - today.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays < 0) {
			return `Overdue by ${Math.abs(diffDays)} days`;
		} else if (diffDays === 0) {
			return 'Due today';
		} else if (diffDays === 1) {
			return 'Due tomorrow';
		} else {
			return `Due in ${diffDays} days`;
		}
	}

	// TrackBy functions for better performance
	trackByMetric(index: number, metric: DashboardMetric): string {
		return metric.id;
	}

	trackByEvent(index: number, event: DashboardEvent): string {
		return event.id;
	}

	trackByActivity(index: number, activity: DashboardActivity): string {
		return activity.id;
	}

	trackByReminder(index: number, reminder: DashboardReminder): string {
		return reminder.id;
	}
}
