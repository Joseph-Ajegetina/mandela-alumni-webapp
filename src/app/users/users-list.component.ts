import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiCell, TuiHeader, TuiSearch } from '@taiga-ui/layout';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	TuiAlertService,
	TuiButton,
	TuiHint,
	TuiLoader,
	TuiTextfield,
	TuiTitle,
} from '@taiga-ui/core';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiBadge, TuiCheckbox, TuiStatus, TuiDataListWrapper } from '@taiga-ui/kit';
import { TuiSelectModule } from '@taiga-ui/legacy';
import { Router, RouterLink } from '@angular/router';

import { IUser } from 'src/app/shared/interfaces/user';
import { UsersService } from '@mandela-alumni-webapp/core-data';

export interface UserWithStatus extends IUser {
	status: 'approved' | 'pending' | 'disapproved';
	statusColor: 'success' | 'warning' | 'error';
    selected?: boolean;
}

@Component({
	selector: 'app-users-list',
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TuiHeader,
		TuiCell,
		TuiSearch,
		TuiTextfield,
		TuiButton,
		TuiTable,
		TuiStatus,
		TuiBadge,
		TuiCheckbox,
		TuiHint,
		TuiLoader,
		TuiTitle,
		TuiSelectModule,
		TuiDataListWrapper,
		RouterLink,
	],
	templateUrl: './users-list.component.html',
	styleUrl: './users-list.component.less',
	standalone: true,
})
export class UsersListComponent implements OnInit {
	userService = inject(UsersService);
	router = inject(Router);
	private readonly alerts = inject(TuiAlertService);
	
	protected size = 'l';
	users: UserWithStatus[] = [];
	filteredUsers: UserWithStatus[] = [];
	search = '';
	
	form = new FormGroup({
		search: new FormControl(''),
	});

	statusFilterControl = new FormControl('all');
	statusOptions = ['all', 'approved', 'pending', 'disapproved'];

	loading = signal(false);
	selectedStatus = signal<'all' | 'approved' | 'pending' | 'disapproved'>('all');

	ngOnInit(): void {
		this.loading.set(true);
		this.userService.getApprovals().subscribe((users: IUser[]) => {
			this.users = this.mapUsersWithStatus(users);
			this.filteredUsers = [...this.users];
			this.loading.set(false);
		});

		// Listen to search changes
		this.form.get('search')?.valueChanges.subscribe(searchTerm => {
			this.filterUsers();
		});
	}

	private mapUsersWithStatus(users: IUser[]): UserWithStatus[] {
		return users.map(user => {
			let status: 'approved' | 'pending' | 'disapproved';
			let statusColor: 'success' | 'warning' | 'error';

			if (user.approvedAt) {
				status = 'approved';
				statusColor = 'success';
			} else if (user.disapprovedAt) {
				status = 'disapproved';
				statusColor = 'error';
			} else {
				status = 'pending';
				statusColor = 'warning';
			}

			return {
				...user,
				status,
				statusColor,
			};
		});
	}

	private filterUsers(): void {
		const searchTerm = this.form.get('search')?.value?.toLowerCase() || '';
		const statusFilter = this.selectedStatus();

		this.filteredUsers = this.users.filter(user => {
			const matchesSearch = 
				user.firstname.toLowerCase().includes(searchTerm) ||
				user.lastname.toLowerCase().includes(searchTerm) ||
				user.email.toLowerCase().includes(searchTerm) ||
				user.phone.toLowerCase().includes(searchTerm);

			const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

			return matchesSearch && matchesStatus;
		});
	}

	protected get checked(): boolean | null {
		if (!this.filteredUsers.length) {
			return false;
		}

		const every = this.filteredUsers.every(({ selected }) => selected);
		const some = this.filteredUsers.some(({ selected }) => selected);

		return every || (some && null);
	}

	protected onCheck(checked: boolean): void {
		this.filteredUsers.forEach((item) => {
			item.selected = checked;
		});
	}

	onStatusFilterChange(status: string): void {
		this.selectedStatus.set(status as 'all' | 'approved' | 'pending' | 'disapproved');
		this.filterUsers();
	}

	viewUser(user: UserWithStatus): void {
		// Navigate to user details page
		this.router.navigate(['/users', user.id]);
	}

	onActionSelect(action: string, user: UserWithStatus): void {
		switch (action) {
			case 'View':
				this.viewUser(user);
				break;
			case 'Edit':
				// Navigate to edit user page
				this.router.navigate(['/users/edit', user.id]);
				break;
			case 'Delete':
				// Handle delete action - could show confirmation dialog
				console.log('Delete user:', user.id);
				break;
			default:
				console.log('Unknown action:', action);
		}
	}

	getActionControl(user: UserWithStatus): FormControl {
		// Create a form control for each user's action select
		// This ensures each select has its own control
		return new FormControl('View');
	}

	getStatusBadgeText(status: string): string {
		switch (status) {
			case 'approved':
				return 'Approved';
			case 'pending':
				return 'Pending';
			case 'disapproved':
				return 'Disapproved';
			default:
				return 'Unknown';
		}
	}

	getStatusBadgeColor(status: string): string {
		switch (status) {
			case 'approved':
				return '#10b981'; // Green color
			case 'pending':
				return '#f59e0b'; // Amber/Orange color
			case 'disapproved':
				return '#ef4444'; // Red color
			default:
				return '#6b7280'; // Gray color
		}
	}
} 