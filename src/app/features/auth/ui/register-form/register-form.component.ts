import { Component, Input, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
	TuiAppearance,
	TuiButton,
	TuiError,
	TuiIcon,
	TuiLink,
	TuiTextfield,
	TuiTitle,
} from '@taiga-ui/core';
import {
	TuiButtonLoading,
	TuiFieldErrorPipe,
	tuiInputPhoneInternationalOptionsProvider,
	TuiPassword,
	TuiSortCountriesPipe,
	tuiValidationErrorsProvider,
} from '@taiga-ui/kit';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import { TuiInputDateModule, TuiInputPhoneModule } from '@taiga-ui/legacy';
import { TuiSelectModule } from '@taiga-ui/legacy';
import { defer } from 'rxjs';
import { getCountries } from 'libphonenumber-js';
import { TuiInputPhoneInternational } from '@taiga-ui/experimental';
import { TuiDropdownMobile } from '@taiga-ui/addon-mobile';
import type { TuiCountryIsoCode } from '@taiga-ui/i18n';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-register-form',
	imports: [
		CommonModule,
		ReactiveFormsModule,
		TuiInputPhoneModule,
		TuiSelectModule,
		TuiAppearance,
		TuiCardLarge,
		TuiForm,
		TuiTitle,
		TuiButton,
		TuiError,
		TuiFieldErrorPipe,
		TuiHeader,
		TuiButton,
		TuiDropdownMobile,
		TuiInputPhoneInternational,
		TuiSortCountriesPipe,
		TuiTextfield,
		TuiInputDateModule,
		TuiIcon,
		TuiLink,
		RouterLink,
		TuiButtonLoading,
		TuiPassword,
	],
	templateUrl: './register-form.component.html',
	styleUrl: './register-form.component.less',
	providers: [
		tuiInputPhoneInternationalOptionsProvider({
			metadata: defer(async () => import('libphonenumber-js/max/metadata').then((m) => m.default)),
		}),
		tuiValidationErrorsProvider({
			required: 'This field is required',
			email: 'Please enter a valid email address',
			minlength: ({ requiredLength }) => `Must be at least ${requiredLength} characters`,
			mismatch: 'Passwords do not match',
		}),
	],
})
export class RegisterFormComponent {
	@Input() form!: FormGroup;
	@Input() loading = false;
	onRegister = output<void>();

	protected readonly countries = getCountries();
	protected countryIsoCode: TuiCountryIsoCode = 'GH';

	registerUser() {
		console.log('emiting');
		this.onRegister.emit();
	}
}
