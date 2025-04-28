import { NgClass, NgFor, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TuiTable } from '@taiga-ui/addon-table';
import {
	TuiAppearance,
	TuiAutoColorPipe,
	TuiButton,
	TuiDropdown,
	TuiHintDirective,
	TuiIcon,
	TuiLink,
	TuiTitle,
} from '@taiga-ui/core';
import { TuiAvatar, TuiBadge, TuiCheckbox, TuiItemsWithMore, TuiStatus } from '@taiga-ui/kit';
import { TuiCardLarge, TuiCell } from '@taiga-ui/layout';

@Component({
	selector: 'app-payment-page',
	imports: [
		TuiAppearance,
		RouterLink,
		TuiAutoColorPipe,
		TuiAvatar,
		TuiHintDirective,
		TuiLink,
		TuiButton,
		TuiCardLarge,
		TuiCell,

		TuiTitle,

		TuiDropdown,
		TuiIcon,
		NgFor,
		TuiBadge,
		TuiCheckbox,

		TuiItemsWithMore,

		TuiStatus,
		FormsModule,
		NgForOf,
		TuiTable,

		NgClass,
	],
	templateUrl: './payment-page.component.html',
	styleUrl: './payment-page.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentPageComponent {
	// For the tables
	protected readonly sizes = ['l', 'm', 's'] as const;

	protected size = this.sizes[0];

	protected readonly data = [
		{
			checkbox: {
				title: 'Alumni Dues',
			},
			title: {
				title: '32048',
			},
			cell: {
				name: 'Mobile money',
			},
			status: {
				value: '04-04-2025',
			},
			items: ['21:00'],
			selected: false,
		},

		{
			checkbox: {
				title: 'Event Fee',
			},
			title: {
				title: '32048',
			},
			cell: {
				name: 'Credit Card',
			},
			status: {
				value: '04-04-2025',
			},
			items: ['21:00'],
			selected: false,
		},

		{
			checkbox: {
				title: 'Event Fee',
			},
			title: {
				title: '32048',
			},
			cell: {
				name: 'Mobile money',
			},
			status: {
				value: '04-04-2025',
			},
			items: ['21:00'],
			selected: false,
		},

		{
			checkbox: {
				title: 'Event Fee',
			},
			title: {
				title: '32048',
			},
			cell: {
				name: 'Mobile money',
			},
			status: {
				value: '04-04-2025',
			},
			items: ['21:00'],
			selected: false,
		},

		{
			checkbox: {
				title: 'Event Fee',
			},
			title: {
				title: '32048',
			},
			cell: {
				name: 'Mobile money',
			},
			status: {
				value: '04-04-2025',
			},
			items: ['21:00'],
			selected: false,
		},
	];

	protected get checked(): boolean | null {
		const every = this.data.every(({ selected }) => selected);
		const some = this.data.some(({ selected }) => selected);

		return every || (some && null);
	}

	protected onCheck(checked: boolean): void {
		this.data.forEach((item) => {
			item.selected = checked;
		});
	}
}
