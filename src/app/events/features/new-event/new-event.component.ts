import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
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
export class NewEventComponent implements OnInit {
	protected readonly fileControl = new FormControl<TuiFileLike | null>(null);
	readonly router = inject(Router);
	readonly route = inject(ActivatedRoute);
	readonly eventModes = ['online', 'physical', 'hybrid'];
	readonly eventStore = inject(EventStore);
	creating = this.eventStore.isCreatingEvent;
	readonly error = this.eventStore.error;
	readonly alerts = inject(TuiAlertService);

	today = new Date();
	isEditMode = false;
	eventId: string | null = null;
	currentEventImage: string | null = null;
	showUploadSection = false;

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
		// Note: fileControl is separate and optional
	});

	ngOnInit(): void {
		// Check if we're in edit mode by looking at the route
		this.route.params.subscribe((params) => {
			console.log('params', params);
			if (params['id']) {
				this.isEditMode = true;
				this.eventId = params['id'];
				this.loadEventForEditing();
			}
		});
	}

	private async loadEventForEditing(): Promise<void> {
		if (!this.eventId) return;

		try {
			// Load the event data
			const event = await firstValueFrom(this.eventStore.getEventById(this.eventId));
			if (event) {
				console.log('event', event);
				this.prefillForm(event);
			}
		} catch (error) {
			console.error('Error loading event for editing:', error);
			this.alerts
				.open('Failed to load event for editing', {
					label: 'Error',
					appearance: 'negative',
				})
				.subscribe();
		}
	}

	private prefillForm(event: any): void {
		const eventDate = new Date(event.date);
		const tuiDate = new TuiDay(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
		const tuiTime = new TuiTime(eventDate.getHours(), eventDate.getMinutes());

		this.form.patchValue({
			name: event.name,
			description: event.description,
			location: event.location,
			mode: event.type,
			date: tuiDate,
			time: tuiTime,
		});

		// Store the current image URL for preview
		if (event.image) {
			this.currentEventImage = event.image;
		}
	}

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

		// Handle image upload - only append if a new file is selected
		const file = this.file ? (this.fileControl.value as File) : null;
		if (file && file instanceof File) {
			formData.append('file', file);
		} else if (this.isEditMode && this.currentEventImage) {
			// In edit mode, if no new file is uploaded, preserve the existing image
			formData.append('image', this.currentEventImage);
		}

		try {
			if (this.isEditMode && this.eventId) {
				// Update existing event
				await firstValueFrom(this.eventStore.updateEvent(this.eventId, formData));
			} else {
				// Create new event
				await firstValueFrom(this.eventStore.addEvent(formData));
			}

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
