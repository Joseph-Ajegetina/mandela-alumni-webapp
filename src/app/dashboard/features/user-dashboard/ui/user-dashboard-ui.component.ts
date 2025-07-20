import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiIcon } from '@taiga-ui/core';
import {
	DashboardMetric,
	DashboardEvent,
	DashboardActivity,
	DashboardReminder,
} from '@mandela-alumni-webapp/core-data';

@Component({
	selector: 'app-user-dashboard-ui',
	standalone: true,
	imports: [CommonModule, TuiIcon],
	templateUrl: './user-dashboard-ui.component.html',
	styleUrls: ['./user-dashboard-ui.component.less'],
})
export class UserDashboardUiComponent {
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
}
