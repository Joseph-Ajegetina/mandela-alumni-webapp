import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterFormComponent } from '../../ui/register-form/register-form.component';
import { TuiDay } from '@taiga-ui/cdk';
import { passwordMatchValidator } from '../../utils/match-password.directive';
import { IError } from '../../models/error';
import { TuiAlertService } from '@taiga-ui/core';
import { AccountService } from '../../data-access/account.service';

@Component({
	selector: 'app-register',
	imports: [RegisterFormComponent],
	templateUrl: './register.component.html',
	styleUrl: './register.component.less',
})
export class RegisterComponent {
	accountService = inject(AccountService);
	private router = inject(Router);
	form!: FormGroup;
	loading = signal(false);
	private readonly alerts = inject(TuiAlertService);

	constructor() {
		this.setupForm();
	}

	submit(): void {
		console.log(this.form);
		if (this.form.invalid) {
			return;
		}
		this.loading.set(true);

		const payload = this.getRegistrationDTO();
		console.log(payload);

		this.accountService.register(payload).subscribe({
			next: (result) => {
				this.loading.set(false);
				console.log('server result after new ', result);
				this.router.navigateByUrl('/login');
			},
			error: (error) => {
				this.handleError(error);
			},
		});
	}

	fb = inject(FormBuilder);

	getRegistrationDTO() {
		const firstName = this.form.controls['firstName'].value;
		const lastName = this.form.controls['lastName'].value;
		const email = this.form.controls['email'].value;
		const phone = this.form.controls['phone'].value;
		const role = this.form.controls['role'].value;
		const dob = this.form.controls['dob'].value;
		const password = this.form.controls['password'].value;

		return { firstName, lastName, email, phone, role, dob, password };
	}

	private setupForm() {
		this.form = new FormGroup(
			{
				firstName: new FormControl('', Validators.required),
				lastName: new FormControl('', Validators.required),
				phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
				email: new FormControl('', [Validators.email, Validators.required]),
				role: new FormControl({ value: 'member', disabled: true }),
				dob: new FormControl(new TuiDay(2017, 2, 15), Validators.required),
				password: new FormControl('', [Validators.required, Validators.minLength(2)]),
				confirmPassword: new FormControl('', [Validators.required, Validators.minLength(2)]),
			},
			{
				validators: passwordMatchValidator,
			},
		);
	}

	handleError(error: IError) {
		this.loading.set(false);
		this.alerts
			.open(error.message || 'Something went wrong', {
				label: error.error || 'Error',
				appearance: 'negative',
			})
			.subscribe();
	}
}
