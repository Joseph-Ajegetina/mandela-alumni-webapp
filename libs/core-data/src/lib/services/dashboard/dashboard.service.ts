import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable, of } from 'rxjs';
import { 
	MOCK_ADMIN_DASHBOARD, 
	MOCK_USER_DASHBOARD, 
	MOCK_RECENT_USERS,
	MOCK_CALENDAR_EVENTS,
	MOCK_NOTIFICATIONS,
	MOCK_ANALYTICS
} from './mock-data';

export interface DashboardMetric {
	id: string;
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
	time?: string;
	eventMode?: string;
	location?: string;
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

export interface DashboardData {
	metrics: DashboardMetric[];
	events: DashboardEvent[];
	activities: DashboardActivity[];
	reminders: DashboardReminder[];
}

export interface RecentUser {
	name: string;
	email: string;
	date: string;
	status: 'Active' | 'Pending';
	profile?: string;
}

export interface CalendarEvent {
	id: string;
	title: string;
	date: string;
	type: 'event' | 'reminder';
	color: string;
}

export interface Notification {
	id: string;
	title: string;
	message: string;
	timestamp: string;
	read: boolean;
	type: 'event' | 'payment' | 'profile';
}

export interface AnalyticsData {
	userGrowth: Array<{ month: string; users: number }>;
	revenueData: Array<{ month: string; revenue: number }>;
	eventAttendance: Array<{ event: string; attendance: number; capacity: number }>;
}

@Injectable({
	providedIn: 'root'
})
export class DashboardService {
	http = inject(HttpClient);
	url = environment.domain;
	model = '/dashboard';

	constructor() {}

	// Get dashboard data for admin users
	getAdminDashboard(): Observable<DashboardData> {
		return this.http.get<DashboardData>(`${this.getUrl()}/admin`);
	}

	// Get dashboard data for regular users
	getUserDashboard(): Observable<DashboardData> {
		return this.http.get<DashboardData>(`${this.getUrl()}/user`);
	}

	// Get metrics for admin dashboard
	getAdminMetrics(): Observable<DashboardMetric[]> {
		return this.http.get<DashboardMetric[]>(`${this.getUrl()}/admin/metrics`);
	}

	// Get metrics for user dashboard
	getUserMetrics(): Observable<DashboardMetric[]> {
		return this.http.get<DashboardMetric[]>(`${this.getUrl()}/user/metrics`);
	}

	// Get recent activities
	getRecentActivities(): Observable<DashboardActivity[]> {
		return this.http.get<DashboardActivity[]>(`${this.getUrl()}/activities`);
	}

	// Get upcoming events
	getUpcomingEvents(): Observable<DashboardEvent[]> {
		return this.http.get<DashboardEvent[]>(`${this.getUrl()}/events`);
	}

	// Get reminders
	getReminders(): Observable<DashboardReminder[]> {
		return this.http.get<DashboardReminder[]>(`${this.getUrl()}/reminders`);
	}

	// Get recent users for admin dashboard
	getRecentUsers(): Observable<RecentUser[]> {
		return this.http.get<RecentUser[]>(`${this.getUrl()}/recent-users`);
	}

	// Get calendar events
	getCalendarEvents(): Observable<CalendarEvent[]> {
		return this.http.get<CalendarEvent[]>(`${this.getUrl()}/calendar-events`);
	}

	// Get notifications
	getNotifications(): Observable<Notification[]> {
		return this.http.get<Notification[]>(`${this.getUrl()}/notifications`);
	}

	// Get analytics data
	getAnalytics(): Observable<AnalyticsData> {
		return this.http.get<AnalyticsData>(`${this.getUrl()}/analytics`);
	}

	// Mock data methods for development (remove in production)
	getMockAdminDashboard(): Observable<DashboardData> {
		return of(MOCK_ADMIN_DASHBOARD);
	}

	getMockUserDashboard(): Observable<DashboardData> {
		return of(MOCK_USER_DASHBOARD);
	}

	getMockRecentUsers(): Observable<RecentUser[]> {
		return of(MOCK_RECENT_USERS);
	}

	getMockCalendarEvents(): Observable<CalendarEvent[]> {
		return of(MOCK_CALENDAR_EVENTS);
	}

	getMockNotifications(): Observable<Notification[]> {
		return of(MOCK_NOTIFICATIONS);
	}

	getMockAnalytics(): Observable<AnalyticsData> {
		return of(MOCK_ANALYTICS);
	}

	private getUrl() {
		return `${environment.domain}${this.model}`;
	}
} 