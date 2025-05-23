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

import { PendingUser } from 'src/app/shared/interfaces/user';
import { UsersService } from '@mandela-alumni-webapp/core-data';

@Component({
	selector: 'app-approval',
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
	templateUrl: './approval.component.html',
	styleUrl: './approval.component.less',
})
export class ApprovalComponent implements OnInit {
	userService = inject(UsersService);
	protected size = 'l';
	private readonly alerts = inject(TuiAlertService);
	pending: PendingUser[] = [];
	search = '';
	form = new FormGroup({
		search: new FormControl(''),
	});

	showApproveTooltip = signal(false);
	showDenyTooltip = signal(false);
	loading = signal(false);
	approving = signal(false);
	denying = signal(false);
	selected = signal<PendingUser | null>(null);

	ngOnInit(): void {
		this.loading.set(true);
		this.userService.getApprovals().subscribe((users: PendingUser[]) => {
			const pendingUsers = this.getPendingUsers(users);
			this.pending = pendingUsers;
			this.loading.set(false);
		});
	}

	protected get checked(): boolean | null {
		if (!this.pending.length) {
			return false;
		}

		const every = this.pending.every(({ selected }) => selected);
		const some = this.pending.some(({ selected }) => selected);

		return every || (some && null);
	}

	protected onCheck(checked: boolean): void {
		this.pending.forEach((item) => {
			item.selected = checked;
		});
	}

	approve(pendingUser: PendingUser) {
		this.approving.set(true);
		this.userService.update(pendingUser.id, { approvedAt: new Date() }).subscribe((res) => {
			this.pending = this.getPendingUsers(this.pending);
			this.showMessage(`${this.selected()?.firstname} aproved`);
			this.closeTooltip();
		});
	}

	getPendingUsers(users: PendingUser[]) {
		return users.filter((user) => !user.approvedAt && !user.disapprovedAt);
	}

	deny(pendingUser: PendingUser) {
		this.denying.set(true);
		this.userService.update(pendingUser.id, { disapprovedAt: new Date() }).subscribe((res) => {
			this.pending = this.getPendingUsers(this.pending);
			this.showMessage(`${this.selected()?.firstname} dissaproved`);
			this.closeTooltip();
		});
	}

	openDenyTooltip(user: PendingUser) {
		this.showDenyTooltip.set(true);
		this.selected.set(user);
	}

	openApproveTooltip(user: PendingUser) {
		this.showApproveTooltip.set(true);
		this.selected.set(user);
	}

	closeTooltip() {
		this.selected.set(null);
		this.showApproveTooltip.set(false);
		this.showDenyTooltip.set(false);
	}

	showMessage(message: string) {
		this.alerts
			.open(message || 'Something went wrong', {
				label: 'Status',
				appearance: 'positive',
			})
			.subscribe();
	}
}
