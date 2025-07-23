import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TuiDay } from '@taiga-ui/cdk';
import { passwordMatchValidator } from '../../auth/utils/match-password.directive';
import { IError } from '../../auth/models/error';
import { TuiAlertService, TuiButton, TuiError, TuiIcon, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { TuiInputDateModule, TuiInputPhoneModule, TuiSelectModule } from '@taiga-ui/legacy';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import { TuiBadge, TuiButtonLoading } from '@taiga-ui/kit';
import { UsersService } from '@mandela-alumni-webapp/core-data';
import { IRegister, Roles } from '@mandela-alumni-webapp/api-interfaces';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'fileSize',
	standalone: true
})
export class FileSizePipe implements PipeTransform {
	transform(bytes: number): string {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}
}

interface CsvUser {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	role: Roles;
	approvalStatus: string;
	dob?: string;
	password?: string;
}

@Component({
	selector: 'app-create-user',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		TuiCardLarge,
		TuiForm,
		TuiHeader,
		TuiTitle,
		TuiButton,
		TuiButtonLoading,
		TuiError,
		TuiFieldErrorPipe,
		TuiTextfield,
		TuiIcon,
		TuiBadge,
		TuiInputDateModule,
		TuiInputPhoneModule,
		TuiSelectModule,
		RouterLink,
		FileSizePipe,
	],
	templateUrl: './create-user.component.html',
	styleUrl: './create-user.component.less',
	providers: [
		// Add validation providers if needed
	],
})
export class CreateUserComponent {
	usersService = inject(UsersService);
	private router = inject(Router);
	private readonly alerts = inject(TuiAlertService);
	fb = inject(FormBuilder);

	form!: FormGroup;
	loading = signal(false);
	bulkLoading = signal(false);
	activeTab = signal<'single' | 'bulk'>('single');
	selectedFile = signal<File | null>(null);
	csvData = signal<CsvUser[]>([]);
	isDragOver = signal(false);
	userRoles = ['member', 'admin'];
	approvalStatuses = ['pending', 'approved', 'disapproved'];

	constructor() {
		this.setupForm();
	}

	setActiveTab(tab: 'single' | 'bulk'): void {
		this.activeTab.set(tab);
	}

	submit(): void {
		if (this.form.invalid) {
			return;
		}
		this.loading.set(true);

		const payload = this.getUserDTO();
		console.log('Creating user with payload:', payload);

		this.usersService.register(payload).subscribe({
			next: (result) => {
				this.loading.set(false);
				this.alerts
					.open('User created successfully!', {
						label: 'Success',
						appearance: 'positive',
					})
					.subscribe();
				this.router.navigateByUrl('/users');
			},
			error: (error) => {
				this.handleError(error);
			},
		});
	}

	getUserDTO() {
		const firstName = this.form.controls['firstName'].value;
		const lastName = this.form.controls['lastName'].value;
		const email = this.form.controls['email'].value;
		const phone = this.form.controls['phone'].value;
		const role = this.form.controls['role'].value;
		const dob = this.form.controls['dob'].value;
		const password = this.form.controls['password'].value;
		const approvalStatus = this.form.controls['approvalStatus'].value;

		return { 
			firstName, 
			lastName, 
			email, 
			phone, 
			role, 
			dob, 
			password,
			approvalStatus 
		};
	}

	private setupForm() {
		this.form = new FormGroup(
			{
				firstName: new FormControl('', Validators.required),
				lastName: new FormControl('', Validators.required),
				phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
				email: new FormControl('', [Validators.email, Validators.required]),
				role: new FormControl('member', Validators.required),
				approvalStatus: new FormControl('pending', Validators.required),
				dob: new FormControl(new TuiDay(1990, 0, 1), Validators.required),
				password: new FormControl('', [Validators.required, Validators.minLength(6)]),
				confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
			},
			{
				validators: passwordMatchValidator,
			},
		);
	}

	handleError(error: IError) {
		this.loading.set(false);
		this.bulkLoading.set(false);
		this.alerts
			.open(error.message || 'Failed to create user', {
				label: error.error || 'Error',
				appearance: 'negative',
			})
			.subscribe();
	}

	cancel(): void {
		this.router.navigateByUrl('/users');
	}

	// CSV Upload Methods
	downloadTemplate(): void {
		const csvContent = 'firstName,lastName,email,phone,role,approvalStatus,dob,password\nJohn,Doe,john.doe@example.com,+1234567890,member,pending,1990-01-01,password123\nJane,Smith,jane.smith@example.com,+1234567891,member,pending,1990-02-01,password123';
		const blob = new Blob([csvContent], { type: 'text/csv' });
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'user_template.csv';
		link.click();
		window.URL.revokeObjectURL(url);
	}

	onDragOver(event: DragEvent): void {
		event.preventDefault();
		this.isDragOver.set(true);
	}

	onDragLeave(event: DragEvent): void {
		event.preventDefault();
		this.isDragOver.set(false);
	}

	onDrop(event: DragEvent): void {
		event.preventDefault();
		this.isDragOver.set(false);
		
		const files = event.dataTransfer?.files;
		if (files && files.length > 0) {
			const file = files[0];
			if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
				this.processFile(file);
			} else {
				this.alerts
					.open('Please select a valid CSV file', {
						label: 'Error',
						appearance: 'negative',
					})
					.subscribe();
			}
		}
	}

	onFileSelected(event: Event): void {
		const target = event.target as HTMLInputElement;
		const files = target.files;
		if (files && files.length > 0) {
			this.processFile(files[0]);
		}
	}

	private processFile(file: File): void {
		this.selectedFile.set(file);
		
		const reader = new FileReader();
		reader.onload = (e) => {
			const text = e.target?.result as string;
			this.parseCSV(text);
		};
		reader.readAsText(file);
	}

	private parseCSV(csvText: string): void {
		const lines = csvText.split('\n');
		const headers = lines[0].split(',').map(h => h.trim());
		const users: CsvUser[] = [];

		for (let i = 1; i < lines.length; i++) {
			const line = lines[i].trim();
			if (!line) continue;

			const values = line.split(',').map(v => v.trim());
			if (values.length >= 6) {
				// Validate role is a valid Roles type
				const roleValue = values[4] || 'member';
				const role: Roles = (roleValue === 'admin' || roleValue === 'member') ? roleValue : 'member';
				
				const user: CsvUser = {
					firstName: values[0] || '',
					lastName: values[1] || '',
					email: values[2] || '',
					phone: values[3] || '',
					role: role,
					approvalStatus: values[5] || 'pending',
					dob: values[6] || undefined,
					password: values[7] || 'defaultPassword123'
				};
				users.push(user);
			}
		}

		this.csvData.set(users);
		
		if (users.length === 0) {
			this.alerts
				.open('No valid user data found in CSV file', {
					label: 'Warning',
					appearance: 'warning',
				})
				.subscribe();
		}
	}

	removeFile(): void {
		this.selectedFile.set(null);
		this.csvData.set([]);
	}

	uploadBulkUsers(): void {
		if (this.csvData().length === 0) {
			return;
		}

		this.bulkLoading.set(true);
		const users = this.csvData();

		// Process users in batches to avoid overwhelming the server
		const batchSize = 5;
		let processed = 0;
		let successCount = 0;
		let errorCount = 0;

		const processBatch = () => {
			const batch = users.slice(processed, processed + batchSize);
			const promises = batch.map(user => {
				// Convert CsvUser to IRegister format
				const registerData: IRegister = {
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					phone: user.phone,
					role: user.role,
					password: user.password || 'defaultPassword123',
					dob: user.dob ? new Date(user.dob) : new Date('1990-01-01')
				};
				
				return this.usersService.register(registerData).toPromise()
					.then(() => successCount++)
					.catch(() => errorCount++);
			});

			Promise.all(promises).then(() => {
				processed += batchSize;
				if (processed < users.length) {
					processBatch();
				} else {
					this.bulkLoading.set(false);
					this.showBulkUploadResult(successCount, errorCount);
				}
			});
		};

		processBatch();
	}

	private showBulkUploadResult(successCount: number, errorCount: number): void {
		let message = `Successfully created ${successCount} users.`;
		if (errorCount > 0) {
			message += ` ${errorCount} users failed to create.`;
		}

		this.alerts
			.open(message, {
				label: successCount > 0 ? 'Success' : 'Warning',
				appearance: errorCount > 0 ? 'warning' : 'positive',
			})
			.subscribe(() => {
				if (successCount > 0) {
					this.router.navigateByUrl('/users');
				}
			});
	}

	trackByIndex(index: number): number {
		return index;
	}
} 