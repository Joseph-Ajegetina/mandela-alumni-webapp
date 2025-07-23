import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TuiDay } from '@taiga-ui/cdk';
import { passwordMatchValidator } from '../auth/utils/match-password.directive';
import { IError } from '../auth/models/error';
import { TuiAlertService, TuiButton, TuiError, TuiIcon, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { TuiInputDateModule, TuiInputPhoneModule, TuiSelectModule } from '@taiga-ui/legacy';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import { TuiBadge, TuiButtonLoading } from '@taiga-ui/kit';
import { UsersService } from '@mandela-alumni-webapp/core-data';

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
	userRoles = ['member', 'admin'];
	approvalStatuses = ['pending', 'approved', 'disapproved'];

	constructor() {
		this.setupForm();
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
} 