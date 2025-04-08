import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EventStore } from '@mandela-alumni-webapp/core-state';
import { TuiDay } from '@taiga-ui/cdk';
import {
	TuiAlertService,
	TuiButton,
	TuiDataList,
	TuiError,
	TuiIcon,
	TuiLabel,
	TuiLink,
	TuiTextfield,
} from '@taiga-ui/core';

import {
	TuiAvatar,
	TuiButtonLoading,
	TuiDataListWrapper,
	TuiFieldErrorPipe,
	TuiFileLike,
	TuiFiles,
} from '@taiga-ui/kit';
import {
	TuiInputDateModule,
	TuiNamedDay,
	TuiSelectModule,
	TuiTextareaModule,
	TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { IError } from 'src/app/auth/models/error';

@Component({
	selector: 'app-new-event',
	imports: [
		CommonModule,
		ReactiveFormsModule,
		TuiAvatar,
		TuiFiles,
		TuiIcon,
		TuiLink,
		TuiTextfield,
		FormsModule,
		TuiInputDateModule,
		TuiLabel,
		TuiTextareaModule,
		TuiTextfieldControllerModule,
		TuiDataList,
		TuiSelectModule,
		TuiDataListWrapper,
		TuiButton,
		TuiButtonLoading,
		TuiError,
		TuiFieldErrorPipe,
	],
	templateUrl: './new-event.component.html',
	styleUrl: './new-event.component.less',
	providers: [EventStore],
})
export class NewEventComponent {
	protected readonly control = new FormControl<TuiFileLike | null>(null);
	readonly router = inject(Router);
	readonly eventModes = ['online', 'physical', 'hybrid'];
	readonly eventStore = inject(EventStore);
	creating = this.eventStore.isLoading;
	readonly error = this.eventStore.error;
	readonly alerts = inject(TuiAlertService);

	protected file: TuiFileLike | null = null;

	protected form = new FormGroup({
		name: new FormControl(null, Validators.required),
		description: new FormControl(null, Validators.required),
		location: new FormControl(null, Validators.required),
		mode: new FormControl(this.eventModes[0], Validators.required),
	});

	protected from: TuiDay | null = null;
	protected to: TuiDay | null = null;
	protected min = new TuiDay(2017, 9, 4);
	protected max = TuiDay.currentLocal();
	protected items = [new TuiNamedDay(TuiDay.currentLocal(), 'Until today')];

	protected selectfield = new FormControl<string | null>(null);

	onFileSelect(event: Event): void {
		const inputElement = event.target as HTMLInputElement;
		const files = inputElement.files;

		if (files && files.length > 0) {
			const uploadedFile = files[0];
			this.file = {
				name: uploadedFile.name,
				size: uploadedFile.size,
				type: uploadedFile.type,
			};
			this.control.setValue(this.file);
		}
	}
	onDragOver(event: DragEvent): void {
		event.preventDefault();
	}

	onDrop(event: DragEvent): void {
		event.preventDefault();
		if (event.dataTransfer && event.dataTransfer.files.length > 0) {
			const uploadedFile = event.dataTransfer.files[0];
			this.file = {
				name: uploadedFile.name,
				size: uploadedFile.size,
				type: uploadedFile.type,
			};
			this.control.setValue(this.file);
		}
	}

	async createEvent() {
		const formData = new FormData();
		formData.append('name', this.form.value.name || '');
		formData.append('description', this.form.value.description || '');
		formData.append('location', this.form.value.location || '');
		formData.append('type', this.form.value.mode || '');
		formData.append('date', new Date().toISOString());

		const file: File | null =
			this.file && 'asFile' in this.file ? (this.file.asFile as File) : null;

		if (file) {
			formData.append('image', file);
		}

		try {
			await this.eventStore.createEvent(formData);

			this.router.navigate(['/events']);
		} catch (err) {
			this.handleError();
		}
	}

	handleError() {
		this.alerts
			.open(this.error() || 'Something went wrong', {
				label: 'Error',
				appearance: 'negative',
			})
			.subscribe();
	}
}
