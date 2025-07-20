import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStore } from '@mandela-alumni-webapp/core-state';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './features/user-dashboard/user-dashboard.component';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [CommonModule, AdminDashboardComponent, UserDashboardComponent],
	template: `
		<!-- Conditionally render dashboard based on user role -->
		<app-admin-dashboard *ngIf="isAdmin()"></app-admin-dashboard>
		<app-user-dashboard *ngIf="!isAdmin()"></app-user-dashboard>
	`,
	styleUrl: './dashboard.component.less',
})
export class DashboardComponent implements OnInit {
	private userStore = inject(UserStore);
	
	// Get isAdmin signal from user store
	isAdmin = this.userStore.isAdmin;

	ngOnInit(): void {
		// Initialize dashboard component
		console.log('Dashboard component initialized');
	}
}
