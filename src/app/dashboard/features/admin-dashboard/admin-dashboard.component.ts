import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardStore } from '@mandela-alumni-webapp/core-state';
import { AdminDashboardUiComponent } from './ui/admin-dashboard-ui.component';

@Component({
	selector: 'app-admin-dashboard',
	standalone: true,
	imports: [CommonModule, AdminDashboardUiComponent],
	template: `
		<app-admin-dashboard-ui
			[metrics]="dashboardStore.adminMetrics()"
			[events]="dashboardStore.adminEvents()"
			[activities]="dashboardStore.adminActivities()"
			[reminders]="dashboardStore.adminReminders()"
			[isLoading]="dashboardStore.isLoading()"
			[error]="dashboardStore.error()"
			(loadData)="loadDashboardData()"
		></app-admin-dashboard-ui>
	`,
})
export class AdminDashboardComponent implements OnInit {
	dashboardStore = inject(DashboardStore);

	ngOnInit(): void {
		this.loadDashboardData();
	}

	loadDashboardData(): void {
		this.dashboardStore.loadAdminDashboard().subscribe();
	}
} 