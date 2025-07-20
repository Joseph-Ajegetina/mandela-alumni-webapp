import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiIcon, TuiCalendar, TuiMarkerHandler } from '@taiga-ui/core';
import { TuiDay } from '@taiga-ui/cdk';

@Component({
	selector: 'app-user-dashboard',
	standalone: true,
	imports: [CommonModule, TuiIcon, TuiCalendar],
	template: `
		<div class="dashboard-container">
			<div class="main-content">
				<!-- Welcome Section -->
				<section class="welcome-section">
					<div class="welcome-content">
						<h1 class="text-2xl font-bold text-primary mb-sm">MyPortal</h1>
						<div class="welcome-greeting flex items-center gap-sm">
							<span class="text-lg">Welcome Ama</span>
							<img
								width="24"
								height="24"
								src="https://img.icons8.com/emoji/48/waving-hand-medium-light-skin-tone.png"
								alt="waving-hand"
							/>
						</div>
					</div>
				</section>

				<!-- Summary Cards Section -->
				<section class="summary-cards">
					<div class="summary-grid grid grid-cols-3 gap-lg">
						<div class="summary-card card bg-primary text-white">
							<div class="summary-content">
								<h3 class="text-2xl font-bold">15,000</h3>
								<p class="text-sm opacity-90">Total Alumni</p>
								<div class="trend flex items-center gap-sm mt-sm">
									<tui-icon icon="@tui.trending-up" class="text-success" />
									<span class="text-xs">2.03% from last month</span>
								</div>
							</div>
						</div>

						<div class="summary-card card bg-secondary text-white">
							<div class="summary-content">
								<h3 class="text-2xl font-bold">$15,000</h3>
								<p class="text-sm opacity-90">Donations This Year</p>
								<div class="trend flex items-center gap-sm mt-sm">
									<tui-icon icon="@tui.trending-up" class="text-success" />
									<span class="text-xs">2.03% from last month</span>
								</div>
							</div>
						</div>

						<div class="summary-card card bg-accent text-white">
							<div class="summary-content">
								<h3 class="text-2xl font-bold">24</h3>
								<p class="text-sm opacity-90">Events This Month</p>
								<div class="trend flex items-center gap-sm mt-sm">
									<tui-icon icon="@tui.trending-up" class="text-success" />
									<span class="text-xs">2.03% from last month</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				<!-- Quick Actions Section -->
				<section class="quick-actions card">
					<div class="section-header">
						<h4>Quick Actions</h4>
						<tui-icon icon="@tui.zap" />
					</div>
					<div class="actions-grid grid grid-cols-4 gap-md">
						<button class="action-btn btn btn-primary flex-col gap-sm p-md">
							<tui-icon icon="@tui.badge-dollar-sign" />
							<span class="text-sm">Pay Dues</span>
						</button>
						<button class="action-btn btn btn-primary flex-col gap-sm p-md">
							<tui-icon icon="@tui.search" />
							<span class="text-sm">Find an Alumni</span>
						</button>
						<button class="action-btn btn btn-primary flex-col gap-sm p-md">
							<tui-icon icon="@tui.pen-line" />
							<span class="text-sm">Register for an event</span>
						</button>
						<button class="action-btn btn btn-primary flex-col gap-sm p-md">
							<tui-icon icon="@tui.heart" />
							<span class="text-sm">Make a donation</span>
						</button>
					</div>
				</section>

				<!-- Upcoming Events Section -->
				<section class="upcoming-events card">
					<div class="section-header flex-between">
						<div class="flex gap-sm">
							<h4>Upcoming Events</h4>
							<tui-icon icon="@tui.calendar-days" />
						</div>
						<a href="/events" class="text-secondary text-sm flex gap-sm">
							<span>See More</span>
							<tui-icon icon="@tui.arrow-right" />
						</a>
					</div>
					<div class="events-grid grid grid-cols-3 gap-lg">
						<div class="event-card flex bg-white rounded-md overflow-hidden shadow-md">
							<div class="event-content flex-1 p-md relative">
								<h4 class="text-light text-sm mb-sm">Leadership Summit 2025</h4>
								<p class="text-light text-xs opacity-80">Leadership Summit – Learn from the Best!</p>
								<tui-icon icon="@tui.arrow-right" class="absolute bottom-md right-md" />
							</div>
							<div class="event-image w-40 bg-gray flex-center">
								<img src="images/graph.png" alt="Leadership Summit" class="w-full h-full object-cover" />
							</div>
						</div>
						<div class="event-card flex bg-white rounded-md overflow-hidden shadow-md">
							<div class="event-content flex-1 p-md relative">
								<h4 class="text-light text-sm mb-sm">Alumni Networking Mixer</h4>
								<p class="text-light text-xs opacity-80">Annual Alumni Reunion – Relive the Moments!</p>
								<tui-icon icon="@tui.arrow-right" class="absolute bottom-md right-md" />
							</div>
							<div class="event-image w-40 bg-gray flex-center">
								<img src="images/network.png" alt="Networking Event" class="w-full h-full object-cover" />
							</div>
						</div>
						<div class="event-card flex bg-white rounded-md overflow-hidden shadow-md">
							<div class="event-content flex-1 p-md relative">
								<h4 class="text-light text-sm mb-sm">Career Growth Webinar</h4>
								<p class="text-light text-xs opacity-80">Career Fair – Unlock New Opportunities!</p>
								<tui-icon icon="@tui.arrow-right" class="absolute bottom-md right-md" />
							</div>
							<div class="event-image w-40 bg-gray flex-center">
								<img src="images/career.png" alt="Career Event" class="w-full h-full object-cover" />
							</div>
						</div>
					</div>
				</section>

				<!-- Recent Activities Section -->
				<section class="recent-activities card">
					<h4 class="text-primary text-lg mb-lg">Recent Activities</h4>
					<div class="activities-list flex-col gap-md">
						<div class="activity-item flex-between p-md border rounded-sm">
							<div class="activity-content flex gap-md">
								<tui-icon icon="@tui.badge-dollar-sign" class="text-primary" />
								<div class="activity-details">
									<p class="text-sm m-0">Paid membership dues for 2025.</p>
									<p class="text-xs text-muted">$150 • 2 days ago</p>
								</div>
							</div>
							<div class="activity-status">
								<span class="status-completed">Completed</span>
							</div>
						</div>
						<div class="activity-item flex-between p-md border rounded-sm">
							<div class="activity-content flex gap-md">
								<tui-icon icon="@tui.file-text" class="text-primary" />
								<div class="activity-details">
									<p class="text-sm m-0">Submitted application for the Alumni Entrepreneurship Fund.</p>
									<p class="text-xs text-muted">3 days ago • Free</p>
								</div>
							</div>
							<div class="activity-status">
								<span class="status-pending">Pending</span>
							</div>
						</div>
						<div class="activity-item flex-between p-md border rounded-sm">
							<div class="activity-content flex gap-md">
								<tui-icon icon="@tui.calendar-1" class="text-primary" />
								<div class="activity-details">
									<p class="text-sm m-0">Registered for 'Alumni Leadership Summit 2025'.</p>
									<p class="text-xs text-muted">Jul 12, 2025 2:58 p.m. • Free</p>
								</div>
							</div>
							<div class="activity-status">
								<span class="status-pending">Pending</span>
							</div>
						</div>
					</div>
					<!-- Pagination -->
					<div class="pagination flex justify-center gap-sm mt-lg">
						<button class="pagination-btn">1</button>
						<button class="pagination-btn">2</button>
						<button class="pagination-btn">
							<tui-icon icon="@tui.arrow-right" />
						</button>
					</div>
				</section>
			</div>

			<div class="sidebar">
				<!-- Profile Completion Section -->
				<section class="profile-completion card">
					<h4 class="text-primary text-lg mb-lg">Profile Completion</h4>
					<div class="completion-progress mb-lg">
						<div class="progress-bar bg-gray rounded-full h-2">
							<div class="progress-fill bg-primary h-2 rounded-full" style="width: 50%"></div>
						</div>
						<p class="text-sm text-muted mt-sm">50% Complete</p>
					</div>
					<div class="completion-checklist flex-col gap-sm">
						<div class="checklist-item flex items-center gap-sm">
							<tui-icon icon="@tui.check-circle" class="text-success" />
							<span class="text-sm">Basic Information</span>
						</div>
						<div class="checklist-item flex items-center gap-sm">
							<tui-icon icon="@tui.check-circle" class="text-success" />
							<span class="text-sm">Profession</span>
						</div>
						<div class="checklist-item flex items-center gap-sm">
							<tui-icon icon="@tui.circle" class="text-muted" />
							<span class="text-sm">Address</span>
						</div>
						<div class="checklist-item flex items-center gap-sm">
							<tui-icon icon="@tui.circle" class="text-muted" />
							<span class="text-sm">Bio Description</span>
						</div>
					</div>
					<button class="btn btn-primary w-full mt-lg">Complete Profile</button>
				</section>

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
	styleUrls: ['./user-dashboard.component.less']
})
export class UserDashboardComponent {
	selectedDays: TuiDay[] = [];
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