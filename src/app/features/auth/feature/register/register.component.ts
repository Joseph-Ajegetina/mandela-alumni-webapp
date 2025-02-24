import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constant } from 'src/app/shared/constant/contant';
import { IRegisterMessage } from 'src/app/features/auth/models/register';
import { ServiceService } from 'src/app/shared/services/service.service';
import { RegisterFormComponent } from '../../ui/register-form/register-form.component';
import { passwordMatchValidator } from '../../utils/password.validator';

@Component({
	selector: 'app-register',
	imports: [RegisterFormComponent],
	templateUrl: './register.component.html',
	styleUrl: './register.component.less',
})
export class RegisterComponent {
	errorMessage = '';
	successMessage: string | null = null;
	memberReistration = inject(ServiceService);
	private router = inject(Router);
	form!: FormGroup;

	protected items = ['Alumni', 'Member'];

	constructor() {
		this.setupForm();
	}

	submit(): void {
		this.successMessage = null;
		this.errorMessage = '';

		if (this.form.invalid) {
			this.errorMessage = 'Please fill in all fields';
			return;
		}

		// Check if passwords match
		const password = this.form.get('password')?.value;
		const confirmPassword = this.form.get('confirmpassword')?.value;

		if (password !== confirmPassword) {
			this.errorMessage = 'Passwords do not match';
			window.alert(this.errorMessage);
			return;
		}

		// this.memberReistration.registerUser(this.form.value).subscribe({
		//   next: (res: IRegisterMessage) => {
		//     this.successMessage = res.message || 'Registration successful!';
		//     window.alert(this.successMessage);

		//     console.log('Registration successful:', res);
		//     this.router.navigate(['/login']);
		//   },
		//   error: (err) => {

		//     this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
		//     console.error('Registration failed:', err);
		//   }
		// });
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

		return { firstName, lastName, email, phone, role };
	}

	private setupForm() {
		this.form = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			phone: ['', [Validators.required, Validators.minLength(8)]],
			email: ['', [Validators.email, Validators.required]],
			role: ['member'],
			dob: ['', Validators.required],
			password: ['', Validators.required, Validators.minLength(2)],
			confirmPassword: ['', Validators.required, Validators.minLength(2), passwordMatchValidator],
		});
	}
}
