import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from '../../ui/register-form/register-form.component';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { AuthService } from '../../data-access/auth.service';
import { RegisterData } from '../../models/register-data';
import { Roles } from '../../models/roles';
import { User } from '../../models/user';

@Component({
	selector: 'app-register',
	imports: [CommonModule, RegisterFormComponent],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css',
})
export class RegisterComponent {
	authService = inject(AuthService);
	fb = inject(FormBuilder);
	form!: FormGroup;

	constructor() {
		this.setupForm();
	}

	registerUser() {
		const registrationDTO: RegisterData = this.getRegistrationDTO();
		this.authService.registerUser(registrationDTO).subscribe((user: User) => {
			console.log('user created');
		});
	}

	getRegistrationDTO() {
		const firstName = this.form.controls['firstName'].value;
		const lastName = this.form.controls['lastName'].value;
		const email = this.form.controls['email'].value;
		const phone = this.form.controls['phone'].value;
		const role = this.form.controls['role'].value;

		return { firstName, lastName, email, phone, role };
	}

	private setupForm() {
		this.form = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			phone: ['', [Validators.required, Validators.minLength(8)]],
			email: ['', [Validators.email, Validators.required]],
			role: ['member'],
		});
	}
}
