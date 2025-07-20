import { Injectable } from '@angular/core';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiMarkerHandler } from '@taiga-ui/core';
import { Observable, of } from 'rxjs';

export interface DashboardMetric {
	value: string | number;
	label: string;
	trend: number;
	icon: string;
	color: string;
}

export interface DashboardEvent {
	id: string;
	title: string;
	description: string;
	date: string;
	attendees?: string;
	image?: string;
}

export interface DashboardActivity {
	id: string;
	title: string;
	description: string;
	date: string;
	status: 'completed' | 'pending' | 'failed';
	amount?: string;
	icon: string;
}

export interface DashboardReminder {
	id: string;
	title: string;
	dueDate: string;
	color: string;
}

@Injectable({
	providedIn: 'root'
})
export class DashboardService {

	// Admin Dashboard Data
	getAdminMetrics(): Observable<DashboardMetric[]> {
		return of([
			{
				value: '15,000',
				label: 'Active Users',
				trend: 2.03,
				icon: '@tui.users',
				color: 'bg-primary'
			},
			{
				value: '$15,000',
				label: 'Monthly Revenue',
				trend: 2.03,
				icon: '@tui.dollar-sign',
				color: 'bg-secondary'
			},
			{
				value: '15,000',
				label: 'Total Users',
				trend: 2.03,
				icon: '@tui.user-check',
				color: 'bg-accent'
			},
			{
				value: '300',
				label: 'Pending Approvals',
				trend: 2.03,
				icon: '@tui.clock',
				color: 'bg-success'
			}
		]);
	}

	getAdminEvents(): Observable<DashboardEvent[]> {
		return of([
			{
				id: '1',
				title: 'Leadership Summit 2025',
				description: 'Leadership Summit – Learn from the Best!',
				date: 'Jul 12, 2025',
				attendees: '245/300 attendees'
			},
			{
				id: '2',
				title: 'Alumni Networking Mixer',
				description: 'Annual Alumni Reunion – Relive the Moments!',
				date: 'Jul 15, 2025',
				attendees: '180/200 attendees'
			}
		]);
	}

	getAdminRecentUsers(): Observable<any[]> {
		return of([
			{ name: 'Kofi Manu Sarpong', email: 'kofi@example.com', date: '21-02-2025', status: 'Active' },
			{ name: 'Kofi Manu Sarpong', email: 'kofi@example.com', date: '21-02-2025', status: 'Pending' },
			{ name: 'Kofi Manu Sarpong', email: 'kofi@example.com', date: '21-02-2025', status: 'Active' },
			{ name: 'Kofi Manu Sarpong', email: 'kofi@example.com', date: '21-02-2025', status: 'Pending' }
		]);
	}

	// User Dashboard Data
	getUserMetrics(): Observable<DashboardMetric[]> {
		return of([
			{
				value: '15,000',
				label: 'Total Alumni',
				trend: 2.03,
				icon: '@tui.users',
				color: 'bg-primary'
			},
			{
				value: '$15,000',
				label: 'Donations This Year',
				trend: 2.03,
				icon: '@tui.heart',
				color: 'bg-secondary'
			},
			{
				value: '24',
				label: 'Events This Month',
				trend: 2.03,
				icon: '@tui.calendar',
				color: 'bg-accent'
			}
		]);
	}

	getUserEvents(): Observable<DashboardEvent[]> {
		return of([
			{
				id: '1',
				title: 'Leadership Summit 2025',
				description: 'Leadership Summit – Learn from the Best!',
				date: 'Jul 12, 2025',
				image: 'images/graph.png'
			},
			{
				id: '2',
				title: 'Alumni Networking Mixer',
				description: 'Annual Alumni Reunion – Relive the Moments!',
				date: 'Jul 15, 2025',
				image: 'images/network.png'
			},
			{
				id: '3',
				title: 'Career Growth Webinar',
				description: 'Career Fair – Unlock New Opportunities!',
				date: 'Jul 18, 2025',
				image: 'images/career.png'
			}
		]);
	}

	getUserActivities(): Observable<DashboardActivity[]> {
		return of([
			{
				id: '1',
				title: 'Paid membership dues for 2025.',
				description: '$150 • 2 days ago',
				date: '2 days ago',
				status: 'completed',
				amount: '$150',
				icon: '@tui.badge-dollar-sign'
			},
			{
				id: '2',
				title: 'Submitted application for the Alumni Entrepreneurship Fund.',
				description: '3 days ago • Free',
				date: '3 days ago',
				status: 'pending',
				icon: '@tui.file-text'
			},
			{
				id: '3',
				title: 'Registered for \'Alumni Leadership Summit 2025\'.',
				description: 'Jul 12, 2025 2:58 p.m. • Free',
				date: 'Jul 12, 2025 2:58 p.m.',
				status: 'pending',
				icon: '@tui.calendar-1'
			}
		]);
	}

	// Shared Data
	getReminders(): Observable<DashboardReminder[]> {
		return of([
			{ id: '1', title: 'Membership Renewal', dueDate: 'Due in 2 days', color: 'bg-warning' },
			{ id: '2', title: 'Summit Registration', dueDate: 'Closes Jan 20', color: 'bg-primary' },
			{ id: '3', title: 'Summit Registration', dueDate: 'Closes Jan 20', color: 'bg-success' }
		]);
	}

	getSelectedDays(): TuiDay[] {
		return [
			new TuiDay(2025, 2, 10), // March 10, 2025
			new TuiDay(2025, 2, 15), // March 15, 2025
			new TuiDay(2025, 2, 20), // March 20, 2025
		];
	}

	getMarkerHandler(): TuiMarkerHandler {
		const selectedDays = this.getSelectedDays();
		return (day: TuiDay) => {
			return selectedDays.some((d) => d.daySame(day)) ? ['var(--tui-primary)'] : [];
		};
	}

	onDayClick(day: TuiDay): void {
		// Handle calendar day click
		console.log('Day clicked:', day);
	}
} 