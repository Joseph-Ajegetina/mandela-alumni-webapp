import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	TuiAlertService,
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
	TuiButtonLoading,
} from '@taiga-ui/kit';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../data-access/services/auth.service';
import { Router } from '@angular/router';
import { IError } from '../../models/error';
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
		TuiButtonLoading,
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.less',
	providers: [
		tuiValidationErrorsProvider({
			required: 'Email is required',
		}),
	],
})
export class LoginComponent {
	authService = inject(AuthService);
	router = inject(Router);
	private readonly alerts = inject(TuiAlertService);

	loading = signal(false);

	protected readonly form = new FormGroup({
		password: new FormControl(''),
		email: new FormControl('', [Validators.email, Validators.required]),
	});

	login() {
		if (this.form.invalid) {
			return;
		}

		const loginDTO = this.getLoginDTO();
		if (!loginDTO.email || !loginDTO.password) {
			return;
		}

		this.loading.set(true);

		this.authService.login(loginDTO.email, loginDTO.password).subscribe({
			next: (result) => {
				this.router.navigateByUrl('/dashboard');
			},
			error: (response) => {
				console.error(response.error);
				this.handleError(response.error);
			},
		});
	}

	getLoginDTO() {
		const email = this.form.controls['email'].value;
		const password = this.form.controls['password'].value;

		return { email, password };
	}

	handleError(error: IError) {
		this.loading.set(false);
		this.alerts.open(error.message, { label: error.error, appearance: 'negative' }).subscribe();
	}
}
