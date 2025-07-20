import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiIcon, TuiCalendar, TuiMarkerHandler } from '@taiga-ui/core';
import { TuiDay } from '@taiga-ui/cdk';
import { DashboardMetric, DashboardEvent, DashboardActivity, DashboardReminder, RecentUser } from '@mandela-alumni-webapp/core-data';
import { SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-admin-dashboard-ui',
	standalone: true,
	imports: [CommonModule, TuiIcon, TuiCalendar],
	templateUrl: './admin-dashboard-ui.component.html',
	styleUrls: ['./admin-dashboard-ui.component.less']
})
export class AdminDashboardUiComponent {
	@Input() metrics: DashboardMetric[] = [];
	@Input() events: DashboardEvent[] = [];
	@Input() activities: DashboardActivity[] = [];
	@Input() reminders: DashboardReminder[] = [];
	@Input() isLoading = false;
	@Input() error: string | null = null;

	@Output() loadData = new EventEmitter<void>();

	selectedDays: TuiDay[] = [];
	
	// Setter for reminders to trigger calendar update
	set _reminders(value: DashboardReminder[]) {
		this.reminders = value;
		this.updateReminderDates();
	}
	
	// Mock recent users data
	recentUsers: RecentUser[] = [
		{ 
			name: 'Kofi Manu Sarpong', 
			email: 'kofi.sarpong@example.com', 
			date: '21-02-2025', 
			status: 'Active',
			profile: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
		},
		{ 
			name: 'Ama Osei', 
			email: 'ama.osei@example.com', 
			date: '20-02-2025', 
			status: 'Pending',
			profile: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
		},
		{ 
			name: 'Kwame Addo', 
			email: 'kwame.addo@example.com', 
			date: '19-02-2025', 
			status: 'Active',
			profile: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
		},
		{ 
			name: 'Sarah Johnson', 
			email: 'sarah.johnson@example.com', 
			date: '18-02-2025', 
			status: 'Pending',
			profile: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
		}
	];

	constructor() {
		// Initialize calendar with reminder dates
		this.initializeReminderDates();
	}

	ngOnInit() {
		// Update reminder dates when reminders input changes
		this.updateReminderDates();
	}

	ngOnChanges(changes: SimpleChanges) {
		// Update reminder dates when reminders input changes
		if (changes['reminders']) {
			console.log('Reminders changed:', this.reminders);
			this.updateReminderDates();
		}
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
			console.log('Updating reminder dates with:', this.reminders);
			// Convert reminder dates to TuiDay objects
			this.selectedDays = this.reminders.map(reminder => {
				// Parse the reminder dueDate (format: '2025-07-22')
				const dateParts = reminder.dueDate.split('-');
				const tuiDay = new TuiDay(
					parseInt(dateParts[0]), // year
					parseInt(dateParts[1]) - 1, // month (0-based)
					parseInt(dateParts[2]) // day
				);
				console.log('Created TuiDay for reminder:', reminder.title, tuiDay);
				return tuiDay;
			});
			console.log('Updated selectedDays:', this.selectedDays);
		} else {
			// Fallback to default reminder dates if no reminders provided
			this.initializeReminderDates();
		}
	}

	onDayClick(day: TuiDay): void {
		// Handle calendar day click
		console.log('Calendar day clicked:', day);
	}

	getReminderColor(reminder: DashboardReminder): string {
		// Calculate days remaining to determine color
		const daysRemaining = this.calculateDaysRemaining(reminder.dueDate);
		
		if (daysRemaining <= 1) return 'orange'; // Critical - orange
		if (daysRemaining <= 3) return 'blue'; // Urgent - blue
		return 'green'; // Normal - green
	}

	getDaysRemaining(dueDate: string): string {
		const daysRemaining = this.calculateDaysRemaining(dueDate);
		
		if (daysRemaining === 0) return 'Due today';
		if (daysRemaining === 1) return 'Due tomorrow';
		if (daysRemaining < 0) return 'Overdue';
		return `Due in ${daysRemaining} days`;
	}

	private calculateDaysRemaining(dueDate: string): number {
		// Parse the due date (format: '2025-07-22')
		const dateParts = dueDate.split('-');
		const dueDateObj = new Date(
			parseInt(dateParts[0]), // year
			parseInt(dateParts[1]) - 1, // month (0-based)
			parseInt(dateParts[2]) // day
		);
		
		// Set current date to July 20, 2025 for testing
		const today = new Date(2025, 6, 20); // July 20, 2025 (month is 0-based)
		today.setHours(0, 0, 0, 0); // Reset time to start of day
		dueDateObj.setHours(0, 0, 0, 0); // Reset time to start of day
		
		const timeDiff = dueDateObj.getTime() - today.getTime();
		const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
		
		return daysDiff;
	}

	markerHandler: TuiMarkerHandler = (day: TuiDay) => {
		// Check if this day has any reminders
		const dayReminders = this.selectedDays.filter(d => d.daySame(day));
		if (dayReminders.length > 0) {
			// Find the reminder for this day and get its color
			const reminder = this.reminders?.find(r => {
				const reminderDate = this.parseDateToTuiDay(r.dueDate);
				return reminderDate.daySame(day);
			});
			console.log('is reminder', reminder);
			if (reminder) {
				const color = this.getReminderColor(reminder);
				console.log('Reminder color:', color);
				switch (color) {
					case 'orange': return ['var(--reminder-orange)'];
					case 'blue': return ['var(--reminder-blue)'];
					case 'green': return ['var(--reminder-green)'];
					default: return ['var(--tui-primary)'];
				}
			}
			return ['var(--tui-primary)'];
		}
		return [];
	};

	private parseDateToTuiDay(dateString: string): TuiDay {
		const dateParts = dateString.split('-');
		return new TuiDay(
			parseInt(dateParts[0]), // year
			parseInt(dateParts[1]) - 1, // month (0-based)
			parseInt(dateParts[2]) // day
		);
	}
} 