import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	TuiAppearance,
	TuiButton,
	TuiError,
	TuiGroup,
	TuiIcon,
	TuiNotification,
	TuiTextfield,
	TuiTitle,
} from '@taiga-ui/core';
import {
	TuiFieldErrorPipe,
	TuiSegmented,
	TuiSwitch,
	TuiTooltip,
	TuiPassword,
	tuiValidationErrorsProvider,
	TuiBlock,
} from '@taiga-ui/kit';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../data-access/auth.service';
@Component({
	selector: 'app-login',
	imports: [
		CommonModule,
		ReactiveFormsModule,
		TuiAppearance,
		TuiButton,
		TuiCardLarge,
		TuiError,
		TuiFieldErrorPipe,
		TuiForm,
		TuiHeader,
		TuiIcon,
		TuiTextfield,
		TuiTitle,
		TuiPassword,
		TuiGroup,
		TuiBlock,
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
	providers: [
		tuiValidationErrorsProvider({
			required: 'Email is required',
		}),
	],
})
export class LoginComponent {
	authService = inject(AuthService);
	protected readonly form = new FormGroup({
		password: new FormControl(''),
		email: new FormControl('', [Validators.email, Validators.required]),
	});

	login() {
		if (this.form.invalid) {
			return;
		}

		const loginDTO = this.getLoginDTO();
		console.log('DTO ', loginDTO);
	}

	getLoginDTO() {
		const email = this.form.controls['email'].value;
		const password = this.form.controls['password'].value;

		return { email, password };
	}
}
