export { UsersService } from './lib/services/users/users.service';
export { AuthService } from './lib/services/auth/auth.service';
export { EventsService } from './lib/services/events/events.service';
export * from './lib/services/events/mock-data';

// Dashboard exports
export { DashboardService } from './lib/services/dashboard/dashboard.service';
export type { 
	DashboardData, 
	DashboardMetric, 
	DashboardEvent, 
	DashboardActivity, 
	DashboardReminder,
	RecentUser,
	CalendarEvent,
	Notification,
	AnalyticsData
} from './lib/services/dashboard/dashboard.service';
export * from './lib/services/dashboard/mock-data';
