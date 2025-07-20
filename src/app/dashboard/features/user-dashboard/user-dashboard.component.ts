import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardStore } from '@mandela-alumni-webapp/core-state';
import { UserDashboardUiComponent } from './ui/user-dashboard-ui.component';
import { DashboardEvent } from '@mandela-alumni-webapp/core-data';

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
			(eventClick)="onEventClick($event)"
			(payDues)="onPayDues()"
			(findAlumni)="onFindAlumni()"
			(registerEvent)="onRegisterEvent()"
			(makeDonation)="onMakeDonation()"
		></app-user-dashboard-ui>
	`,
})
export class UserDashboardComponent implements OnInit {
	dashboardStore = inject(DashboardStore);
	private router = inject(Router);

	ngOnInit(): void {
		this.loadDashboardData();
	}

	loadDashboardData(): void {
		this.dashboardStore.loadUserDashboard().subscribe();
	}

	onEventClick(event: DashboardEvent): void {
		// Navigate to event details page
		this.router.navigate(['/events', event.id]);
	}

	onPayDues(): void {
		// Navigate to payment page
		this.router.navigate(['/payment']);
	}

	onFindAlumni(): void {
		// Navigate to alumni search page (placeholder)
		this.router.navigate(['/alumni']);
	}

	onRegisterEvent(): void {
		// Navigate to events page
		this.router.navigate(['/events']);
	}

	onMakeDonation(): void {
		// Navigate to donation page (placeholder)
		this.router.navigate(['/donation']);
	}
}
