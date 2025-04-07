import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import {
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
		AsyncPipe,
		TuiButton,
		TuiButtonLoading,
		TuiError,
		TuiFieldErrorPipe,
	],
	templateUrl: './new-event.component.html',
	styleUrl: './new-event.component.less',
})
export class NewEventComponent {
	protected readonly control = new FormControl<TuiFileLike | null>(null);
	readonly eventModes = ['online', 'physical', 'hybrid'];
	creating = signal(false);

	protected file: TuiFileLike | null = null;

	protected form = new FormGroup({
		event: new FormControl('', Validators.required),
		description: new FormControl('', Validators.required),
		location: new FormControl('', Validators.required),
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

	createEvent() {
		this.creating.set(true);
		console.log(this.form.value);
	}
}
