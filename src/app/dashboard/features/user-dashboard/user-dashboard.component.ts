import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardStore } from '@mandela-alumni-webapp/core-state';
import { UserDashboardUiComponent } from './ui/user-dashboard-ui.component';

@Component({
	selector: 'app-user-dashboard',
	standalone: true,
	imports: [CommonModule, UserDashboardUiComponent],
	template: `
		<app-user-dashboard-ui
			[metrics]="dashboardStore.userMetrics()"
			[events]="dashboardStore.userEvents()"
			[activities]="dashboardStore.userActivities()"
			[reminders]="dashboardStore.userReminders()"
			[isLoading]="dashboardStore.isLoading()"
			[error]="dashboardStore.error()"
			(loadData)="loadDashboardData()"
		></app-user-dashboard-ui>
	`,
})
export class UserDashboardComponent implements OnInit {
	dashboardStore = inject(DashboardStore);

	ngOnInit(): void {
		this.loadDashboardData();
	}

	loadDashboardData(): void {
		this.dashboardStore.loadUserDashboard().subscribe();
	}
} 