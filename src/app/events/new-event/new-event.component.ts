import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EventStore } from '@mandela-alumni-webapp/core-state';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
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
	TuiInputTimeModule,
	TuiSelectModule,
	TuiTextareaModule,
	TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { firstValueFrom } from 'rxjs';
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
		RouterLink,
		TuiInputTimeModule,
	],
	templateUrl: './new-event.component.html',
	styleUrl: './new-event.component.less',
	providers: [EventStore],
})
export class NewEventComponent {
	protected readonly fileControl = new FormControl<TuiFileLike | null>(null);
	readonly router = inject(Router);
	readonly eventModes = ['online', 'physical', 'hybrid'];
	readonly eventStore = inject(EventStore);
	creating = this.eventStore.isCreatingEvent;
	readonly error = this.eventStore.error;
	readonly alerts = inject(TuiAlertService);

	today = new Date();

	protected file: TuiFileLike | null = null;
	protected startDate = new TuiDay(
		this.today.getFullYear(),
		this.today.getMonth(),
		this.today.getDate(),
	);

	protected form = new FormGroup({
		name: new FormControl(null, Validators.required),
		description: new FormControl(null, Validators.required),
		location: new FormControl(null, Validators.required),
		mode: new FormControl(this.eventModes[0], Validators.required),
		date: new FormControl(),
		time: new FormControl(new TuiTime(12, 30)),
	});

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
			this.fileControl.setValue(uploadedFile);
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
			this.fileControl.setValue(uploadedFile);
		}
	}

	async createEvent() {
		const formData = new FormData();
		formData.append('name', this.form.value.name || '');
		formData.append('description', this.form.value.description || '');
		formData.append('location', this.form.value.location || '');
		formData.append('type', this.form.value.mode || '');
		formData.append('date', this.getEventDateTime());

		const file = this.file ? (this.fileControl.value as File) : null;

		if (file) {
			formData.append('file', file);
		}

		try {
			await firstValueFrom(this.eventStore.addEvent(formData));

			this.router.navigate(['/events']);
		} catch (err) {
			this.handleError();
		}
	}

	handleError() {
		this.alerts
			.open('Something went wrong', {
				label: 'Error',
				appearance: 'negative',
			})
			.subscribe();
	}

	getEventDateTime() {
		const date: TuiDay = this.form.value.date ?? null;
		const time: TuiTime | null = this.form.value.time ?? null;
		const utcDate = date?.toUtcNativeDate();
		const milliseconds = time?.toAbsoluteMilliseconds();
		utcDate.setMilliseconds(milliseconds || 0);

		return utcDate?.toISOString();
	}
}
