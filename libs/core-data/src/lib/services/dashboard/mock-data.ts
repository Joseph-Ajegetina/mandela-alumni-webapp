import { DashboardData, DashboardMetric, DashboardEvent, DashboardActivity, DashboardReminder } from './dashboard.service';

// Mock data for admin dashboard
export const MOCK_ADMIN_DASHBOARD: DashboardData = {
	metrics: [
		{
			id: '1',
			value: '15,247',
			label: 'Active Users',
			trend: 2.03,
			icon: '@tui.users',
			color: 'bg-primary'
		},
		{
			id: '2',
			value: '$15,420',
			label: 'Monthly Revenue',
			trend: 1.85,
			icon: '@tui.dollar-sign',
			color: 'bg-secondary'
		},
		{
			id: '3',
			value: '18,932',
			label: 'Total Users',
			trend: 3.12,
			icon: '@tui.user-check',
			color: 'bg-accent'
		},
		{
			id: '4',
			value: '324',
			label: 'Pending Approvals',
			trend: -5.2,
			icon: '@tui.clock',
			color: 'bg-success'
		}
	],
	events: [
		{
			id: '1',
			title: 'Leadership Summit 2025',
			description: 'Leadership Summit – Learn from the Best!',
			date: 'Jul 12, 2025',
			time: '09:00 AM',
			eventMode: 'Hybrid',
			location: 'Accra, Ghana',
			attendees: '245/300 attendees'
		},
		{
			id: '2',
			title: 'Alumni Networking Mixer',
			description: 'Annual Alumni Reunion – Relive the Moments!',
			date: 'Jul 15, 2025',
			time: '06:00 PM',
			eventMode: 'In-Person',
			location: 'London, UK',
			attendees: '180/200 attendees'
		},
		{
			id: '3',
			title: 'Tech Innovation Workshop',
			description: 'Exploring the latest in technology and innovation',
			date: 'Jul 18, 2025',
			time: '02:00 PM',
			eventMode: 'Virtual',
			location: 'Online',
			attendees: '156/200 attendees'
		}
	],
	activities: [
		{
			id: '1',
			title: 'New user registration: Sarah Johnson',
			description: '2 hours ago',
			date: '2 hours ago',
			status: 'completed',
			icon: '@tui.user-plus'
		},
		{
			id: '2',
			title: 'Event created: Tech Innovation Workshop',
			description: '4 hours ago',
			date: '4 hours ago',
			status: 'completed',
			icon: '@tui.calendar-plus'
		},
		{
			id: '3',
			title: 'Payment processed: $1,200',
			description: '6 hours ago',
			date: '6 hours ago',
			status: 'completed',
			icon: '@tui.credit-card'
		}
	],
	reminders: [
		{ id: '1', title: 'Membership Renewal', dueDate: 'Due in 2 days', color: 'bg-warning' },
		{ id: '2', title: 'Summit Registration', dueDate: 'Closes Jan 20', color: 'bg-primary' },
		{ id: '3', title: 'Budget Review', dueDate: 'Due tomorrow', color: 'bg-success' },
		{ id: '4', title: 'Team Meeting', dueDate: 'Today 3:00 PM', color: 'bg-accent' }
	]
};

// Mock data for user dashboard
export const MOCK_USER_DASHBOARD: DashboardData = {
	metrics: [
		{
			id: '1',
			value: '15,247',
			label: 'Total Alumni',
			trend: 2.03,
			icon: '@tui.users',
			color: 'bg-primary'
		},
		{
			id: '2',
			value: '$15,420',
			label: 'Donations This Year',
			trend: 1.85,
			icon: '@tui.heart',
			color: 'bg-secondary'
		},
		{
			id: '3',
			value: '24',
			label: 'Events This Month',
			trend: 3.12,
			icon: '@tui.calendar',
			color: 'bg-accent'
		}
	],
	events: [
		{
			id: '1',
			title: 'Leadership Summit 2025',
			description: 'Leadership Summit – Learn from the Best!',
			date: 'Jul 12, 2025',
			time: '09:00 AM',
			eventMode: 'Hybrid',
			location: 'Accra, Ghana',
			image: 'images/graph.png'
		},
		{
			id: '2',
			title: 'Alumni Networking Mixer',
			description: 'Annual Alumni Reunion – Relive the Moments!',
			date: 'Jul 15, 2025',
			time: '06:00 PM',
			eventMode: 'In-Person',
			location: 'London, UK',
			image: 'images/network.png'
		},
		{
			id: '3',
			title: 'Career Growth Webinar',
			description: 'Career Fair – Unlock New Opportunities!',
			date: 'Jul 18, 2025',
			time: '02:00 PM',
			eventMode: 'Virtual',
			location: 'Online',
			image: 'images/career.png'
		}
	],
	activities: [
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
		},
		{
			id: '4',
			title: 'Updated profile information.',
			description: '1 week ago',
			date: '1 week ago',
			status: 'completed',
			icon: '@tui.user-edit'
		},
		{
			id: '5',
			title: 'Made a donation to the Alumni Fund.',
			description: '$50 • 1 week ago',
			date: '1 week ago',
			status: 'completed',
			amount: '$50',
			icon: '@tui.heart'
		}
	],
	reminders: [
		{ id: '1', title: 'Membership Renewal', dueDate: 'Due in 2 days', color: 'bg-warning' },
		{ id: '2', title: 'Summit Registration', dueDate: 'Closes Jan 20', color: 'bg-primary' },
		{ id: '3', title: 'Profile Completion', dueDate: 'Complete your profile', color: 'bg-success' },
		{ id: '4', title: 'Event Reminder', dueDate: 'Leadership Summit tomorrow', color: 'bg-accent' }
	]
};

// Mock recent users for admin dashboard
export const MOCK_RECENT_USERS = [
	{ 
		name: 'Kofi Manu Sarpong', 
		email: 'kofi.sarpong@example.com', 
		date: '21-02-2025', 
		status: 'Active' as const,
		profile: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
	},
	{ 
		name: 'Ama Osei', 
		email: 'ama.osei@example.com', 
		date: '20-02-2025', 
		status: 'Pending' as const,
		profile: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
	},
	{ 
		name: 'Kwame Addo', 
		email: 'kwame.addo@example.com', 
		date: '19-02-2025', 
		status: 'Active' as const,
		profile: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
	},
	{ 
		name: 'Sarah Johnson', 
		email: 'sarah.johnson@example.com', 
		date: '18-02-2025', 
		status: 'Pending' as const,
		profile: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
	},
	{ 
		name: 'Michael Chen', 
		email: 'michael.chen@example.com', 
		date: '17-02-2025', 
		status: 'Active' as const,
		profile: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
	}
];

// Mock calendar events
export const MOCK_CALENDAR_EVENTS = [
	{
		id: '1',
		title: 'Leadership Summit',
		date: '2025-07-12',
		type: 'event' as const,
		color: 'primary'
	},
	{
		id: '2',
		title: 'Alumni Mixer',
		date: '2025-07-15',
		type: 'event' as const,
		color: 'secondary'
	},
	{
		id: '3',
		title: 'Career Webinar',
		date: '2025-07-18',
		type: 'event' as const,
		color: 'accent'
	},
	{
		id: '4',
		title: 'Membership Renewal',
		date: '2025-01-25',
		type: 'reminder' as const,
		color: 'warning'
	}
];

// Mock notifications
export const MOCK_NOTIFICATIONS = [
	{
		id: '1',
		title: 'New Event Available',
		message: 'Leadership Summit 2025 registration is now open',
		timestamp: '2 hours ago',
		read: false,
		type: 'event' as const
	},
	{
		id: '2',
		title: 'Payment Successful',
		message: 'Your membership dues payment has been processed',
		timestamp: '1 day ago',
		read: true,
		type: 'payment' as const
	},
	{
		id: '3',
		title: 'Profile Update',
		message: 'Your profile has been successfully updated',
		timestamp: '2 days ago',
		read: true,
		type: 'profile' as const
	}
];

// Mock analytics data
export const MOCK_ANALYTICS = {
	userGrowth: [
		{ month: 'Jan', users: 14500 },
		{ month: 'Feb', users: 14800 },
		{ month: 'Mar', users: 15200 },
		{ month: 'Apr', users: 15400 },
		{ month: 'May', users: 15600 },
		{ month: 'Jun', users: 15800 }
	],
	revenueData: [
		{ month: 'Jan', revenue: 12000 },
		{ month: 'Feb', revenue: 13500 },
		{ month: 'Mar', revenue: 14200 },
		{ month: 'Apr', revenue: 14800 },
		{ month: 'May', revenue: 15200 },
		{ month: 'Jun', revenue: 15420 }
	],
	eventAttendance: [
		{ event: 'Leadership Summit', attendance: 245, capacity: 300 },
		{ event: 'Alumni Mixer', attendance: 180, capacity: 200 },
		{ event: 'Tech Workshop', attendance: 156, capacity: 200 },
		{ event: 'Career Fair', attendance: 220, capacity: 250 }
	]
}; 