import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiIcon, TuiCalendar, TuiMarkerHandler } from '@taiga-ui/core';
import { TuiDay } from '@taiga-ui/cdk';

@Component({
	selector: 'app-admin-dashboard',
	standalone: true,
	imports: [CommonModule, TuiIcon, TuiCalendar],
	template: `
		<div class="dashboard-container">
			<div class="main-content">
				<!-- Key Metrics Section -->
				<section class="metrics-section">
					<div class="metrics-grid grid grid-cols-4 gap-lg">
						<div class="metric-card card bg-primary text-white">
							<div class="metric-content flex-between">
								<div>
									<h3 class="text-2xl font-bold">15,000</h3>
									<p class="text-sm opacity-90">Active Users</p>
								</div>
								<div class="metric-trend flex items-center gap-sm">
									<tui-icon icon="@tui.trending-up" class="text-success" />
									<span class="text-xs">2.03%</span>
								</div>
							</div>
							<p class="text-xs opacity-75 mt-sm">from last month</p>
						</div>

						<div class="metric-card card bg-secondary text-white">
							<div class="metric-content flex-between">
								<div>
									<h3 class="text-2xl font-bold">$15,000</h3>
									<p class="text-sm opacity-90">Monthly Revenue</p>
								</div>
								<div class="metric-trend flex items-center gap-sm">
									<tui-icon icon="@tui.trending-up" class="text-success" />
									<span class="text-xs">2.03%</span>
								</div>
							</div>
							<p class="text-xs opacity-75 mt-sm">from last month</p>
						</div>

						<div class="metric-card card bg-accent text-white">
							<div class="metric-content flex-between">
								<div>
									<h3 class="text-2xl font-bold">15,000</h3>
									<p class="text-sm opacity-90">Total Users</p>
								</div>
								<div class="metric-trend flex items-center gap-sm">
									<tui-icon icon="@tui.trending-up" class="text-success" />
									<span class="text-xs">2.03%</span>
								</div>
							</div>
							<p class="text-xs opacity-75 mt-sm">from last month</p>
						</div>

						<div class="metric-card card bg-success text-white">
							<div class="metric-content flex-between">
								<div>
									<h3 class="text-2xl font-bold">300</h3>
									<p class="text-sm opacity-90">Pending Approvals</p>
								</div>
								<div class="metric-trend flex items-center gap-sm">
									<tui-icon icon="@tui.trending-up" class="text-white" />
									<span class="text-xs">2.03%</span>
								</div>
							</div>
							<p class="text-xs opacity-75 mt-sm">from last month</p>
						</div>
					</div>
				</section>

				<!-- Quick Actions Section -->
				<section class="quick-actions card">
					<div class="section-header">
						<h4>Quick Actions</h4>
						<tui-icon icon="@tui.zap" />
					</div>
					<div class="actions-grid grid grid-cols-5 gap-md">
						<button class="action-btn btn btn-primary flex-col gap-sm p-md">
							<tui-icon icon="@tui.user-plus" />
							<span class="text-sm">Add User</span>
						</button>
						<button class="action-btn btn btn-primary flex-col gap-sm p-md">
							<tui-icon icon="@tui.calendar-plus" />
							<span class="text-sm">Create Event</span>
						</button>
						<button class="action-btn btn btn-primary flex-col gap-sm p-md">
							<tui-icon icon="@tui.edit" />
							<span class="text-sm">Send Notice</span>
						</button>
						<button class="action-btn btn btn-primary flex-col gap-sm p-md">
							<tui-icon icon="@tui.heart" />
							<span class="text-sm">Make a donation</span>
						</button>
						<button class="action-btn btn btn-primary flex-col gap-sm p-md">
							<tui-icon icon="@tui.download" />
							<span class="text-sm">Export Data</span>
						</button>
					</div>
				</section>

				<!-- Recent User Registrations Section -->
				<section class="recent-registrations card">
					<div class="section-header">
						<h4>Recent User Registrations</h4>
						<tui-icon icon="@tui.users" />
					</div>
					<div class="table-container">
						<table class="w-full">
							<thead>
								<tr class="border-b">
									<th class="text-left p-md text-sm font-semibold">Name</th>
									<th class="text-left p-md text-sm font-semibold">Email</th>
									<th class="text-left p-md text-sm font-semibold">Date Submitted</th>
									<th class="text-left p-md text-sm font-semibold">Request Category</th>
								</tr>
							</thead>
							<tbody>
								<tr class="border-b" *ngFor="let user of recentUsers">
									<td class="p-md text-sm">{{ user.name }}</td>
									<td class="p-md text-sm">{{ user.email }}</td>
									<td class="p-md text-sm">{{ user.date }}</td>
									<td class="p-md">
										<span [class]="user.status === 'Active' ? 'status-active' : 'status-pending'">
											{{ user.status }}
										</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>

				<!-- Manage Upcoming Events Section -->
				<section class="manage-events card">
					<div class="section-header flex-between">
						<div class="flex gap-sm">
							<h4>Manage Upcoming Events</h4>
							<tui-icon icon="@tui.calendar" />
						</div>
						<a href="/events" class="text-secondary text-sm flex gap-sm">
							<span>View All</span>
							<tui-icon icon="@tui.arrow-right" />
						</a>
					</div>
					<div class="events-grid grid grid-cols-2 gap-lg">
						<div class="event-card flex bg-white rounded-md overflow-hidden shadow-md">
							<div class="event-content flex-1 p-md">
								<h4 class="text-light text-sm mb-sm">Leadership Summit 2025</h4>
								<p class="text-muted text-xs mb-sm">Jul 12, 2025</p>
								<p class="text-success text-xs">245/300 attendees</p>
							</div>
							<div class="event-actions p-md flex-center">
								<button class="btn btn-secondary p-sm">
									<tui-icon icon="@tui.edit" />
								</button>
							</div>
						</div>
						<div class="event-card flex bg-white rounded-md overflow-hidden shadow-md">
							<div class="event-content flex-1 p-md">
								<h4 class="text-light text-sm mb-sm">Alumni Networking Mixer</h4>
								<p class="text-muted text-xs mb-sm">Jul 15, 2025</p>
								<p class="text-success text-xs">180/200 attendees</p>
							</div>
							<div class="event-actions p-md flex-center">
								<button class="btn btn-secondary p-sm">
									<tui-icon icon="@tui.edit" />
								</button>
							</div>
						</div>
					</div>
				</section>
			</div>

			<div class="sidebar">
				<!-- Calendar Section -->
				<section class="calendar-section card">
					<div class="section-header">
						<h4>Calendar</h4>
						<tui-icon icon="@tui.calendar-days" class="text-primary" />
					</div>
					<div class="calendar-widget">
						<tui-calendar
							[value]="selectedDays"
							[markerHandler]="markerHandler"
							(dayClick)="onDayClick($event)"
						>
						</tui-calendar>
					</div>
				</section>

				<!-- Reminders Section -->
				<section class="reminders card">
					<h4 class="text-primary text-lg mb-lg">Reminders</h4>
					<div class="reminders-list flex-col gap-md">
						<div class="reminder-item flex gap-md" *ngFor="let reminder of reminders">
							<div class="reminder-dot" [class]="reminder.color"></div>
							<div class="reminder-content flex-1">
								<p class="text-sm font-medium">{{ reminder.title }}</p>
								<p class="text-xs text-muted">{{ reminder.dueDate }}</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	`,
	styleUrls: ['./admin-dashboard.component.less']
})
export class AdminDashboardComponent {
	selectedDays: TuiDay[] = [];
	recentUsers = [
		{ name: 'Kofi Manu Sarpong', email: 'kofi@example.com', date: '21-02-2025', status: 'Active' },
		{ name: 'Kofi Manu Sarpong', email: 'kofi@example.com', date: '21-02-2025', status: 'Pending' },
		{ name: 'Kofi Manu Sarpong', email: 'kofi@example.com', date: '21-02-2025', status: 'Active' },
		{ name: 'Kofi Manu Sarpong', email: 'kofi@example.com', date: '21-02-2025', status: 'Pending' }
	];

	reminders = [
		{ title: 'Membership Renewal', dueDate: 'Due in 2 days', color: 'bg-warning' },
		{ title: 'Summit Registration', dueDate: 'Closes Jan 20', color: 'bg-primary' },
		{ title: 'Summit Registration', dueDate: 'Closes Jan 20', color: 'bg-success' }
	];

	onDayClick(day: TuiDay): void {
		// Handle calendar day click
	}

	markerHandler: TuiMarkerHandler = (day: TuiDay) => {
		return this.selectedDays.some((d) => d.daySame(day)) ? ['var(--tui-primary)'] : [];
	};
} 