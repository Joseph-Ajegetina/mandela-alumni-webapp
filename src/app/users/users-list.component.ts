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
import { TuiBadge, TuiCheckbox, TuiStatus } from '@taiga-ui/kit';
import { Router } from '@angular/router';

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

	onStatusFilterChange(status: 'all' | 'approved' | 'pending' | 'disapproved'): void {
		this.selectedStatus.set(status);
		this.filterUsers();
	}

	viewUser(user: UserWithStatus): void {
		// Navigate to user details page
		this.router.navigate(['/users', user.id]);
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
				return 'var(--tui-success-fill)';
			case 'pending':
				return 'var(--tui-warning-fill)';
			case 'disapproved':
				return 'var(--tui-error-fill)';
			default:
				return 'var(--tui-base-04)';
		}
	}
} 