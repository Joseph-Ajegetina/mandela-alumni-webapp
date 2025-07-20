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
	template: `
		<div class="dashboard-container">
			<div class="main-content">
				<!-- Key Metrics Section -->
				<section class="metrics-section">
					<div class="metrics-grid grid grid-cols-3 gap-lg">
						<div class="metric-card-user" *ngFor="let metric of metrics">
							<!-- Header: Label -->
							<div class="metric-header">
								<p class="text-sm opacity-90 mb-0">{{ metric.label }}</p>
							</div>

							<!-- Content: Value -->
							<div class="metric-content">
								<h3 class="text-2xl font-bold mb-0">{{ metric.value }}</h3>
							</div>

							<!-- Footer: Trend -->
							<div class="metric-footer">
								<div class="metric-trend flex items-center gap-sm">
									<tui-icon [icon]="metric.icon" class="text-success" />
									<span class="text-xs">{{ metric.trend }}%</span>
								</div>
								<p class="text-xs opacity-75 mb-0">from last month</p>
							</div>
						</div>
					</div>
				</section>

				<!-- Recent Activities Section -->
				<section class="recent-activities card">
					<div class="section-header">
						<h4>Recent Activities</h4>
						<tui-icon icon="@tui.activity" />
					</div>
					<div class="activities-list">
						<div
							class="activity-item flex gap-md p-md border-b"
							*ngFor="let activity of activities"
						>
							<div class="activity-icon">
								<tui-icon [icon]="activity.icon" class="text-primary" />
							</div>
							<div class="activity-content flex-1">
								<p class="text-sm font-medium">{{ activity.title }}</p>
								<p class="text-xs text-muted">{{ activity.description }}</p>
							</div>
							<div class="activity-status">
								<span
									[class]="activity.status === 'completed' ? 'status-completed' : 'status-pending'"
								>
									{{ activity.status }}
								</span>
							</div>
						</div>
					</div>
				</section>

				<!-- Upcoming Events Section -->
				<section class="upcoming-events card">
					<div class="section-header flex-between">
						<div class="flex gap-sm">
							<h4>Upcoming Events</h4>
							<tui-icon icon="@tui.calendar" />
						</div>
						<a href="/events" class="text-secondary text-sm flex gap-sm">
							<span>View All</span>
							<tui-icon icon="@tui.arrow-right" />
						</a>
					</div>
					<div class="events-grid grid grid-cols-3 gap-lg">
						<div
							class="event-card bg-white rounded-lg overflow-hidden shadow-md"
							*ngFor="let event of events"
						>
							<div class="event-image" *ngIf="event.image">
								<img [src]="event.image" [alt]="event.title" class="w-full h-32 object-cover" />
							</div>
							<div class="event-content p-md">
								<h4 class="text-light text-sm mb-sm">{{ event.title }}</h4>
								<p class="text-muted text-xs mb-sm">{{ event.description }}</p>
								<div class="event-details flex gap-sm text-xs text-muted">
									<span>{{ event.date }}</span>
									<span *ngIf="event.time">{{ event.time }}</span>
								</div>
								<div class="event-location text-xs text-muted mt-sm" *ngIf="event.location">
									<tui-icon icon="@tui.map-pin" class="mr-xs" />
									{{ event.location }}
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>

			<div class="sidebar">
				<!-- Reminders Section -->
				<section class="reminders-section">
					<h4 class="text-primary text-lg mb-lg">Reminders</h4>
					<div class="reminders-list flex-col gap-md">
						<div class="reminder-item reminder-item-orange">
							<div class="reminder-dot bg-reminder-orange rounded-full w-3 h-3"></div>
							<div class="reminder-content flex-1">
								<p class="text-sm font-medium">Membership Renewal</p>
								<p class="text-xs text-muted">Due in 2 days</p>
							</div>
						</div>
						<div class="reminder-item reminder-item-blue">
							<div class="reminder-dot bg-reminder-blue rounded-full w-3 h-3"></div>
							<div class="reminder-content flex-1">
								<p class="text-sm font-medium">Summit Registration</p>
								<p class="text-xs text-muted">Closes Jan 20</p>
							</div>
						</div>
						<div class="reminder-item reminder-item-green">
							<div class="reminder-dot bg-reminder-green rounded-full w-3 h-3"></div>
							<div class="reminder-content flex-1">
								<p class="text-sm font-medium">Profile Completion</p>
								<p class="text-xs text-muted">Complete your profile</p>
							</div>
						</div>
						<div class="reminder-item reminder-item-orange">
							<div class="reminder-dot bg-reminder-orange rounded-full w-3 h-3"></div>
							<div class="reminder-content flex-1">
								<p class="text-sm font-medium">Event Reminder</p>
								<p class="text-xs text-muted">Leadership Summit tomorrow</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	`,
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
}
