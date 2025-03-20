import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiCell, TuiHeader, TuiSearch } from '@taiga-ui/layout';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiTable } from '@taiga-ui/addon-table';
import data from './models/data';
import { TuiBadge, TuiCheckbox, TuiStatus } from '@taiga-ui/kit';

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
	],
	templateUrl: './approval.component.html',
	styleUrl: './approval.component.less',
})
export class ApprovalComponent {
	protected size = 'l';
	tableData = data;
	search = '';
	form = new FormGroup({
		search: new FormControl(''),
	});

	protected get checked(): boolean | null {
		const every = this.tableData.every(({ selected }) => selected);
		const some = this.tableData.some(({ selected }) => selected);

		return every || (some && null);
	}

	protected onCheck(checked: boolean): void {
		this.tableData.forEach((item) => {
			item.selected = checked;
		});
	}
}
